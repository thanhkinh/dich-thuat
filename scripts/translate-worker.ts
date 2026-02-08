#!/usr/bin/env bun
// Translation worker - consumes tasks from SQLite queue

import { Database } from "bun:sqlite";
import { rm } from "node:fs/promises";
import { resolve } from "node:path";

const DB_PATH = resolve(import.meta.dir, "../translate-tasks.db");

interface Task {
  id: number;
  type: string;
  payload: string;
  status: string;
}

interface TranslatePayload {
  book: string;
  chapter: number;
  bookDir: string;
}

async function removePlanningFiles() {
  const filesToRemove = ["findings.md", "progress.md", "task_plan.md"];
  for (const file of filesToRemove) {
    try {
      await rm(file, { force: true });
    } catch {
      // Ignore if file doesn't exist
    }
  }
}

async function runTranslate(book: string, chapter: number): Promise<boolean> {
  const homeDir = process.env.HOME ?? "";
  const claudePath = `${homeDir}/.local/bin/claude`;

  const cmd = Bun.spawn([
    claudePath,
    "--allow-dangerously-skip-permissions",
    "-p",
    `/translate:do ${book} ${chapter}`,
  ], {
    stdout: "inherit",
    stderr: "inherit",
  });

  const exitCode = await cmd.exited;
  return exitCode === 0;
}

async function processTask(db: Database, task: Task): Promise<boolean> {
  // Mark as running
  db.query("UPDATE tasks SET status = 'running' WHERE id = ?").run(task.id);

  try {
    const payload = JSON.parse(task.payload) as TranslatePayload;

    console.log(`  [${task.id}] Starting ${task.type}: ${payload.book} ${payload.chapter}...`);

    switch (task.type) {
      case "translate": {
        await removePlanningFiles();
        const success = await runTranslate(payload.book, payload.chapter);

        if (success) {
          db.query("UPDATE tasks SET status = 'completed', completedAt = datetime('now') WHERE id = ?").run(task.id);
          console.log(`  [${task.id}] Completed ${payload.book} ${payload.chapter}`);
          return true;
        } else {
          db.query("UPDATE tasks SET status = 'failed', error = 'Non-zero exit code' WHERE id = ?").run(task.id);
          console.error(`  [${task.id}] Failed ${payload.book} ${payload.chapter}`);
          return false;
        }
      }
      default:
        throw new Error(`Unknown task type: ${task.type}`);
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    db.query("UPDATE tasks SET status = 'failed', error = ? WHERE id = ?").run(errorMsg, task.id);
    console.error(`  [${task.id}] Error: ${errorMsg}`);
    return false;
  }
}

async function getStats(db: Database) {
  return db.query(`
    SELECT
      COUNT(*) as total,
      SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
      SUM(CASE WHEN status = 'running' THEN 1 ELSE 0 END) as running,
      SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
      SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed
    FROM tasks
  `).get() as { total: number; pending: number; running: number; completed: number; failed: number };
}

function printStats(stats: { total: number; pending: number; running: number; completed: number; failed: number }) {
  console.log(`Progress: ${stats.completed}/${stats.total} completed, ${stats.pending} pending, ${stats.running} running, ${stats.failed} failed`);
}

async function main() {
  const db = new Database(DB_PATH);

  // Check if tasks exist
  const stats = await getStats(db);
  if (stats.total === 0) {
    console.log("No tasks found. Run 'bun run scripts/translate-tasks.ts' first.");
    db.close();
    return;
  }

  console.log("Translation worker started");
  printStats(stats);

  // Reset any stuck 'running' tasks to 'pending'
  db.query("UPDATE tasks SET status = 'pending' WHERE status = 'running'").run();

  let consecutiveErrors = 0;
  const MAX_CONSECUTIVE_ERRORS = 3;

  while (true) {
    // Get next pending task
    const task = db.query(
      "SELECT id, type, payload, status FROM tasks WHERE status = 'pending' LIMIT 1"
    ).get() as Task | null;

    if (!task) {
      console.log("\nNo more pending tasks.");
      break;
    }

    const success = await processTask(db, task);

    if (success) {
      consecutiveErrors = 0;
    } else {
      consecutiveErrors++;
      if (consecutiveErrors >= MAX_CONSECUTIVE_ERRORS) {
        console.error(`\nToo many consecutive errors (${consecutiveErrors}). Stopping.`);
        break;
      }
    }

    // Print progress every 5 tasks
    const currentStats = await getStats(db);
    if (currentStats.completed % 5 === 0 || currentStats.pending === 0) {
      printStats(currentStats);
    }
  }

  // Final stats
  const finalStats = await getStats(db);
  console.log("\n=== Final Summary ===");
  printStats(finalStats);

  // Show failed tasks
  const failed = db.query("SELECT id, type, payload, error FROM tasks WHERE status = 'failed'").all() as Array<{ id: number; type: string; payload: string; error: string }>;
  if (failed.length > 0) {
    console.log("\nFailed tasks:");
    for (const f of failed) {
      console.log(`  [${f.id}] ${f.type}: ${f.payload} - ${f.error}`);
    }
  }

  db.close();
}

main().catch(console.error);
