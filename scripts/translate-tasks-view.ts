#!/usr/bin/env bun
// View translation tasks from SQLite queue

import { Database } from "bun:sqlite";
import { resolve } from "node:path";

const DB_PATH = resolve(import.meta.dir, "../translate-tasks.db");

interface Task {
  id: number;
  type: string;
  payload: string;
  status: string;
  createdAt: string;
  completedAt: string | null;
  error: string | null;
}

interface TranslatePayload {
  book: string;
  chapter: number;
  bookDir: string;
}

function parsePayload(payload: string): TranslatePayload | null {
  try {
    return JSON.parse(payload) as TranslatePayload;
  } catch {
    return null;
  }
}

function getStats(db: Database) {
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

function countFilteredTasks(db: Database, conditions: string[], params: string[]): number {
  let query = "SELECT COUNT(*) as count FROM tasks";
  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }
  return (db.query(query).get(...params) as { count: number }).count;
}

type StatusFilter = "pending" | "running" | "completed" | "failed" | "all";

// Simple table renderer
function renderTable(rows: string[][]): void {
  if (rows.length === 0) return;

  // Calculate column widths
  const numCols = rows[0].length;
  const widths = Array.from({ length: numCols }, (_, i) =>
    Math.max(...rows.map(row => (row[i] ?? "").length))
  );

  // Build separator line
  const separator = "+" + widths.map(w => "-".repeat(w + 2)).join("+") + "+";

  // Print table
  console.log(separator);
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.map((cell, j) => ` ${cell.padEnd(widths[j])} `).join("|");
    console.log(`|${cells}|`);
    if (i === 0) console.log(separator); // Header separator
  }
  console.log(separator);
}

function main() {
  const db = new Database(DB_PATH);

  // Check if tasks exist
  const stats = getStats(db);
  if (stats.total === 0) {
    console.log("No tasks found. Run 'bun run scripts/translate-tasks.ts' first.");
    db.close();
    return;
  }

  // Parse args
  const args = process.argv.slice(2);
  let filter: StatusFilter = "all";
  let bookFilter: string | null = null;
  let page = 1;
  let limit = 50;

  for (const arg of args) {
    if (["pending", "running", "completed", "failed", "all"].includes(arg)) {
      filter = arg as StatusFilter;
    } else if (arg.startsWith("--page=")) {
      page = parseInt(arg.split("=")[1]) || 1;
    } else if (arg.startsWith("--limit=")) {
      limit = parseInt(arg.split("=")[1]) || 50;
    } else if (arg === "-p") {
      const idx = args.indexOf(arg);
      page = parseInt(args[idx + 1]) || 1;
    } else if (arg === "-l") {
      const idx = args.indexOf(arg);
      limit = parseInt(args[idx + 1]) || 50;
    } else if (!arg.startsWith("-")) {
      bookFilter = arg.toUpperCase();
    }
  }

  // Build query conditions
  const conditions: string[] = [];
  const params: string[] = [];
  if (filter !== "all") {
    conditions.push("status = ?");
    params.push(filter);
  }
  if (bookFilter) {
    conditions.push("payload LIKE ?");
    params.push(`%"book":"${bookFilter}"%`);
  }

  // Get filtered count
  const filteredCount = countFilteredTasks(db, conditions, params);
  const totalPages = Math.ceil(filteredCount / limit);

  // Validate page
  if (page < 1) page = 1;
  if (page > totalPages && totalPages > 0) page = totalPages;
  const offset = (page - 1) * limit;

  // Build main query
  let query = "SELECT id, type, payload, status, createdAt, completedAt, error FROM tasks";
  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }
  query += " ORDER BY id ASC LIMIT ? OFFSET ?";
  const tasks = db.query(query).all(...params, limit, offset) as Task[];

  // Print stats
  console.log("=== Translation Tasks ===");
  console.log(`Total: ${stats.total} | ⏳ Pending: ${stats.pending} | 🔄 Running: ${stats.running} | ✅ Completed: ${stats.completed} | ❌ Failed: ${stats.failed}\n`);

  if (filteredCount === 0) {
    console.log("No tasks match the filter.");
    db.close();
    return;
  }

  // Build table rows
  const statusSymbol = { pending: "⏳", running: "🔄", completed: "✅", failed: "❌" };

  const rows: string[][] = [
    ["ID", "Status", "Book", "Chapter", "Error"],
  ];

  for (const task of tasks) {
    const data = parsePayload(task.payload);
    if (!data) continue;

    rows.push([
      String(task.id),
      `${statusSymbol[task.status as keyof typeof statusSymbol] || "?"} ${task.status}`,
      data.book,
      String(data.chapter),
      task.error ?? "",
    ]);
  }

  // Render table
  renderTable(rows);

  // Pagination info
  const startIdx = offset + 1;
  const endIdx = Math.min(offset + limit, filteredCount);
  console.log(`\nShowing ${startIdx}-${endIdx} of ${filteredCount} tasks (page ${page}/${totalPages})`);
  console.log(`Usage: --page=<n>|-p <n>  --limit=<n>|-l <n>  [pending|running|completed|failed] [book]`);
  console.log(`Example: bun run scripts/translate-tasks-view.ts --page=2 --limit=20 pending genesis`);

  db.close();
}

main();
