#!/usr/bin/env bun
/**
 * CLI for Vua James translation project.
 */

import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const ROOT_DIR = path.resolve(import.meta.dir);
const VJ_PATH = path.join(ROOT_DIR, "translations/vj");
const KJV_PATH = path.join(ROOT_DIR, "translations/kjv");
const GLOSSARY_BOOKS = path.join(ROOT_DIR, "GLOSSARY.books.yaml");

interface GlossaryBook {
  english: string;
  vietnamese: string;
  code: string;
  chapters: number;
}

interface GlossaryData {
  books: {
    old_testament?: GlossaryBook[];
    new_testament?: GlossaryBook[];
  };
}

interface BookInfo {
  code: string;
  name: string;
  englishName: string;
  testament: "OT" | "NT";
  chapters: number;
  availableChapters: number[];
}

interface ChapterInfo {
  bookCode: string;
  bookName: string;
  chapter: number;
  verses: number;
}

function loadBookNames(): Map<string, GlossaryBook> {
  const content = fs.readFileSync(GLOSSARY_BOOKS, "utf8");
  const data = yaml.load(content) as GlossaryData;

  const books = new Map<string, GlossaryBook>();
  for (const book of [...(data.books.old_testament || []), ...(data.books.new_testament || [])]) {
    books.set(book.code, book);
    // Also map lowercase variant
    books.set(book.code.toLowerCase(), book);
  }
  return books;
}

function normalizeBookCode(input: string): string | null {
  const books = loadBookNames();

  // Exact match
  if (books.has(input)) return input;

  // Try lowercase
  const lower = input.toLowerCase();
  if (books.has(lower)) {
    const book = books.get(lower)!;
    return book.code;
  }

  // Try with dash fix (NT-1 -> NT-01)
  const dashFixed = input.replace(/-(\d)(?!\d)/, "-0$1");
  if (books.has(dashFixed)) return dashFixed;

  const dashFixedLower = dashFixed.toLowerCase();
  if (books.has(dashFixedLower)) {
    const book = books.get(dashFixedLower)!;
    return book.code;
  }

  return null;
}

function listBooks(): BookInfo[] {
  const bookMap = loadBookNames();
  const books: BookInfo[] = [];

  for (const [code, book] of bookMap.entries()) {
    // Skip duplicate lowercase entries
    if (code !== book.code) continue;

    const testament = book.code.startsWith("OT-") ? "OT" : "NT";
    const bookPath = path.join(VJ_PATH, book.code);

    let availableChapters: number[] = [];
    if (fs.existsSync(bookPath)) {
      availableChapters = fs
        .readdirSync(bookPath)
        .filter((f) => f.endsWith(".yaml"))
        .map((f) => parseInt(f.replace(".yaml", ""), 10))
        .sort((a, b) => a - b);
    }

    books.push({
      code: book.code,
      name: book.vietnamese,
      englishName: book.english,
      testament,
      chapters: book.chapters,
      availableChapters,
    });
  }

  return books.sort((a, b) => {
    if (a.testament !== b.testament) return a.testament === "OT" ? -1 : 1;
    return a.code.localeCompare(b.code);
  });
}

function listChapters(bookCode: string): ChapterInfo[] | null {
  const normalized = normalizeBookCode(bookCode);
  if (!normalized) {
    console.error(`Book not found: ${bookCode}`);
    return null;
  }

  const bookPath = path.join(VJ_PATH, normalized);
  if (!fs.existsSync(bookPath)) {
    console.error(`Book directory not found: ${normalized}`);
    return null;
  }

  const books = loadBookNames();
  const bookInfo = books.get(normalized)!;
  const chapters: ChapterInfo[] = [];

  const chapterFiles = fs
    .readdirSync(bookPath)
    .filter((f) => f.endsWith(".yaml"))
    .sort();

  for (const chapterFile of chapterFiles) {
    const chapterNum = parseInt(chapterFile.replace(".yaml", ""), 10);
    const filePath = path.join(bookPath, chapterFile);

    const content = fs.readFileSync(filePath, "utf8");
    const data = yaml.load(content) as Record<string, Record<string, string>>;

    const chapterKey = String(chapterNum);
    const verseMap = data[chapterKey];
    const verseCount = verseMap ? Object.keys(verseMap).length : 0;

    chapters.push({
      bookCode: normalized,
      bookName: bookInfo.vietnamese,
      chapter: chapterNum,
      verses: verseCount,
    });
  }

  return chapters;
}

function cmdBookList() {
  const books = listBooks();

  console.log("CODE     | Testament | Book Name           | English Name      | Chapters | Available");
  console.log("".padEnd(100, "-"));

  for (const book of books) {
    const available =
      book.availableChapters.length > 0
        ? `${book.availableChapters.length} (${book.availableChapters[0]}-${book.availableChapters[book.availableChapters.length - 1]})`
        : "None";

    console.log(
      `${book.code.padEnd(9)} | ${(book.testament + " ").padEnd(10)} | ${book.name.padEnd(19)} | ${book.englishName.padEnd(17)} | ${String(book.chapters).padStart(8)} | ${available}`,
    );
  }

  const totalBooks = books.length;
  const otBooks = books.filter((b) => b.testament === "OT").length;
  const ntBooks = books.filter((b) => b.testament === "NT").length;
  const totalChapters = books.reduce((sum, b) => sum + b.availableChapters.length, 0);

  console.log("".padEnd(100, "-"));
  console.log(`Total: ${totalBooks} books (${otBooks} OT, ${ntBooks} NT), ${totalChapters} chapters available`);
}

function cmdBookChapters(bookCode: string) {
  const chapters = listChapters(bookCode);

  if (!chapters) {
    process.exit(1);
  }

  if (chapters.length === 0) {
    console.log(`No chapters found for ${bookCode}`);
    return;
  }

  console.log(`BOOK-CODE | Book Name | Chapter | Verses | Translation`);
  console.log("".padEnd(70, "-"));

  for (const ch of chapters) {
    console.log(
      `${ch.bookCode.padEnd(9)} | ${ch.bookName.padEnd(9)} | ${String(ch.chapter).padStart(7)} | ${String(ch.verses).padStart(6)} | vj`,
    );
  }

  const totalVerses = chapters.reduce((sum, c) => sum + c.verses, 0);
  console.log("".padEnd(70, "-"));
  console.log(`Total: ${chapters.length} chapters, ${totalVerses} verses`);
}

function cmdRead(bookCode: string, chapterNum: string) {
  const normalized = normalizeBookCode(bookCode);
  if (!normalized) {
    console.error(`Book not found: ${bookCode}`);
    process.exit(1);
  }

  const chapter = parseInt(chapterNum, 10);
  if (isNaN(chapter)) {
    console.error(`Invalid chapter number: ${chapterNum}`);
    process.exit(1);
  }

  const books = loadBookNames();
  const bookInfo = books.get(normalized)!;

  const chapterFile = String(chapter).padStart(2, "0") + ".yaml";
  let filePath = path.join(VJ_PATH, normalized, chapterFile);
  let translation = "vj";

  if (!fs.existsSync(filePath)) {
    filePath = path.join(KJV_PATH, normalized, chapterFile);
    translation = "kjv";
  }

  if (!fs.existsSync(filePath)) {
    console.error(`Chapter not found: ${bookCode} ${chapter}`);
    process.exit(1);
  }

  const content = fs.readFileSync(filePath, "utf8");
  const data = yaml.load(content) as Record<string, Record<string, string>>;

  const chapterKey = String(chapter);
  const verseMap = data[chapterKey];

  if (!verseMap) {
    console.error(`Chapter data not found: ${bookCode} ${chapter}`);
    process.exit(1);
  }

  console.log(`${bookInfo.english} ${chapter} (${translation.toUpperCase()})`);
  console.log("".padEnd(80, "="));

  for (const [verseNum, verseText] of Object.entries(verseMap)) {
    console.log(`${verseNum.padStart(3)} ${verseText}`);
  }
}

function showHelp() {
  console.log("Vua James Translation CLI");
  console.log("");
  console.log("Usage:");
  console.log("  ./cli book.list              List all books");
  console.log("  ./cli book.chapters <CODE>   List chapters for a book");
  console.log("  ./cli read <CODE> <CHAPTER>  Read a chapter");
  console.log("");
  console.log("Examples:");
  console.log("  ./cli book.list");
  console.log("  ./cli book.chapters NT-01");
  console.log("  ./cli book.chapters NT-1     # shorthand also works");
  console.log("  ./cli read NT-01 1           # Read Matthew chapter 1");
  console.log("  ./cli read OT-01 1           # Read Genesis chapter 1");
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    showHelp();
    process.exit(0);
  }

  const command = args[0];

  switch (command) {
    case "book.list":
      cmdBookList();
      break;

    case "book.chapters":
      if (args.length < 2) {
        console.error("Error: book code required");
        console.error("Usage: ./cli book.chapters <CODE>");
        process.exit(1);
      }
      cmdBookChapters(args[1]);
      break;

    case "read":
      if (args.length < 3) {
        console.error("Error: book code and chapter number required");
        console.error("Usage: ./cli read <CODE> <CHAPTER>");
        process.exit(1);
      }
      cmdRead(args[1], args[2]);
      break;

    case "help":
    case "--help":
    case "-h":
      showHelp();
      break;

    default:
      console.error(`Unknown command: ${command}`);
      console.error('Run "./cli help" for usage');
      process.exit(1);
  }
}

main();
