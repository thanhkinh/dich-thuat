#!/usr/bin/env bun
// Generate translation tasks queue in SQLite

import { Database } from "bun:sqlite";
import { readdir } from "node:fs/promises";
import { resolve } from "node:path";

const books = [
  // Old Testament
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
  "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra",
  "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
  "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations",
  "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
  "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
  "Zephaniah", "Haggai", "Zechariah", "Malachi",
  // New Testament
  "Matthew", "Mark", "Luke", "John", "Acts",
  "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
  "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy",
  "2 Timothy", "Titus", "Philemon", "Hebrews", "James",
  "1 Peter", "2 Peter", "1 John", "2 John", "3 John",
  "Jude", "Revelation",
];

const DB_PATH = resolve(import.meta.dir, "../translate-tasks.db");

function getBookDir(index: number): string {
  if (index <= 39) {
    return `OT-${String(index).padStart(2, "0")}`;
  }
  const ntIndex = index - 39;
  return `NT-${String(ntIndex).padStart(2, "0")}`;
}

async function getChapterCount(bookDir: string): Promise<number> {
  const kjvDir = resolve(import.meta.dir, `../translations/kjv/${bookDir}`);
  try {
    const entries = await readdir(kjvDir);
    return entries.filter((e) => e.endsWith(".yaml")).length;
  } catch {
    return 0;
  }
}

async function generateTasks(refresh: boolean = false) {
  const db = new Database(DB_PATH);

  // Create table (generic for all task types)
  db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      payload TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      completedAt TEXT,
      error TEXT
    )
  `);

  // Create index for faster queries
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status)
  `);
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_tasks_type_status ON tasks(type, status)
  `);

  if (refresh) {
    console.log("Clearing existing tasks...");
    db.exec("DELETE FROM tasks");
  }

  // Check existing tasks
  const existingCount = db.query("SELECT COUNT(*) as count FROM tasks").get() as { count: number };
  console.log(`Existing tasks: ${existingCount.count}`);

  if (existingCount.count > 0 && !refresh) {
    console.log("Tasks already exist. Use --refresh to regenerate.");
    db.close();
    return;
  }

  // Generate tasks
  const insert = db.query(
    "INSERT INTO tasks (type, payload) VALUES (?, ?)"
  );

  let totalChapters = 0;
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const bookDir = getBookDir(i + 1);
    const chapterCount = await getChapterCount(bookDir);

    console.log(`${book} (${bookDir}): ${chapterCount} chapters`);

    for (let chapter = 1; chapter <= chapterCount; chapter++) {
      const payload = JSON.stringify({ book, chapter, bookDir });
      insert.run("translate", payload);
      totalChapters++;
    }
  }

  insert.finalize();

  // Summary
  const stats = db.query(`
    SELECT
      COUNT(*) as total,
      SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
      SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
      SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed
    FROM tasks
  `).get() as { total: number; pending: number; completed: number; failed: number };

  console.log("");
  console.log(`Total tasks: ${stats.total}`);
  console.log(`  Pending: ${stats.pending}`);
  console.log(`  Completed: ${stats.completed}`);
  console.log(`  Failed: ${stats.failed}`);

  db.close();
}

// CLI
const args = process.argv.slice(2);
const refresh = args.includes("--refresh");

await generateTasks(refresh);
