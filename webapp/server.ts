import { Elysia, t } from 'elysia';
import { resolve } from 'path';

const TRANSLATIONS_PATH = process.env.TRANSLATIONS_PATH || resolve(import.meta.dir, '../translations/vj');
const PORT = process.env.PORT || '8080';

interface TranslationData {
  [chapter: string]: {
    [verse: string]: string;
  };
}

interface Book {
  id: string;
  name: string;
  chapters: number[];
}

interface Verse {
  number: number;
  text: string;
}

// Book name mapping
const BOOK_NAMES: Record<string, string> = {
  'NT-27': 'Khải Thị Lục (Revelation)',
  'OT-01': 'Sáng Thế (Genesis)',
  'OT-02': 'Xuất Đê (Exodus)',
  'OT-03': 'Lê-vi (Leviticus)',
};

// Load all books
async function loadBooks(): Promise<Book[]> {
  const fs = await import('fs/promises');
  const path = await import('path');

  const books: Book[] = [];

  async function walkDir(dir: string, baseDir: string = dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walkDir(fullPath, baseDir);
      } else if (entry.name.endsWith('.yaml')) {
        const relPath = path.relative(baseDir, fullPath);
        const parts = relPath.split(path.sep);

        if (parts.length === 2) {
          const bookId = parts[0];
          const chapterNum = parseInt(parts[1].replace('.yaml', ''), 10);

          const existingBook = books.find(b => b.id === bookId);
          if (existingBook) {
            existingBook.chapters.push(chapterNum);
          } else {
            books.push({
              id: bookId,
              name: BOOK_NAMES[bookId] || bookId,
              chapters: [chapterNum],
            });
          }
        }
      }
    }
  }

  try {
    await walkDir(TRANSLATIONS_PATH);
  } catch (e) {
    console.error('Error loading books:', e);
  }

  // Sort books and chapters
  books.sort((a, b) => a.id.localeCompare(b.id));
  books.forEach(book => book.chapters.sort((a, b) => a - b));

  return books;
}

// Load a specific chapter
async function loadChapter(bookId: string, chapterNum: number): Promise<{ number: number; verses: Verse[] } | null> {
  const fs = await import('fs/promises');
  const path = await import('path');
  const yaml = await import('js-yaml');

  const filePath = path.join(TRANSLATIONS_PATH, bookId, `${String(chapterNum).padStart(2, '0')}.yaml`);

  try {
    const content = await fs.readFile(filePath, 'utf8');
    const data = yaml.load(content) as TranslationData;

    const chapterKey = String(chapterNum);
    const verseMap = data[chapterKey];

    if (!verseMap) {
      return null;
    }

    const verses: Verse[] = [];
    for (const [verseNum, verseText] of Object.entries(verseMap)) {
      verses.push({
        number: parseInt(verseNum, 10),
        text: verseText as string,
      });
    }

    verses.sort((a, b) => a.number - b.number);

    return { number: chapterNum, verses };
  } catch (e) {
    console.error(`Error loading chapter ${bookId} ${chapterNum}:`, e);
    return null;
  }
}

const app = new Elysia();

// Serve static files
app.get('/static/*', async ({ request }) => {
  const path = await import('path');
  const fs = await import('fs/promises');

  const urlPath = request.url.replace('/static/', '');
  const filePath = path.join('static', urlPath);

  try {
    const content = await fs.readFile(filePath);
    const ext = path.extname(filePath);
    const mimeTypes: Record<string, string> = {
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml',
    };
    return new Response(content, {
      headers: { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
});

// Home page
app.get('/', async () => {
  const books = await loadBooks();

  const ntBooks = books.filter(b => b.id.startsWith('NT-'));
  const otBooks = books.filter(b => b.id.startsWith('OT-'));

  return new Response(getHomePage(books, ntBooks, otBooks), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
});

// Book page
app.get('/book/:bookId', async ({ params }) => {
  const books = await loadBooks();
  const book = books.find(b => b.id === params.bookId);

  if (!book) {
    return new Response('Book not found', { status: 404 });
  }

  const chapter = await loadChapter(params.bookId, book.chapters[0]);

  if (!chapter) {
    return new Response('Chapter not found', { status: 404 });
  }

  return new Response(getBookPage(book, chapter, books), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
});

// Chapter page
app.get('/book/:bookId/:chapterNum', async ({ params }) => {
  const books = await loadBooks();
  const book = books.find(b => b.id === params.bookId);

  if (!book) {
    return new Response('Book not found', { status: 404 });
  }

  const chapterNum = parseInt(params.chapterNum, 10);
  const chapter = await loadChapter(params.bookId, chapterNum);

  if (!chapter) {
    return new Response('Chapter not found', { status: 404 });
  }

  return new Response(getBookPage(book, chapter, books), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
});

// API: List all books
app.get('/api/books', async () => {
  const books = await loadBooks();
  return Response.json(books);
});

// API: Get book chapter
app.get('/api/book/:bookId', async ({ params, query }) => {
  const chapterNum = query.chapter ? parseInt(query.chapter as string, 10) : 1;
  const chapter = await loadChapter(params.bookId, chapterNum);

  if (!chapter) {
    return Response.json({ error: 'Chapter not found' }, { status: 404 });
  }

  return Response.json({
    book: params.bookId,
    chapter: chapterNum,
    verses: chapter.verses,
  });
});

// Start server
app.listen(PORT);
console.log(`Server running on http://localhost:${PORT}`);

// HTML Template functions
function getBaseHtml(title: string, content: string, books: Book[]): string {
  const navLinks = books.map(b =>
    `<a href="/book/${b.id}">${b.name}</a>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Vua James</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; background: #f5f5f5; color: #333; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    header { background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%); color: white; padding: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    header h1 { font-size: 1.8rem; font-weight: 600; }
    header .subtitle { font-size: 0.9rem; opacity: 0.9; margin-top: 5px; }
    nav { background: #fff; border-bottom: 1px solid #e0e0e0; padding: 15px 0; }
    nav .nav-links { display: flex; gap: 20px; flex-wrap: wrap; }
    nav a { color: #2c5282; text-decoration: none; padding: 5px 10px; border-radius: 4px; transition: background 0.2s; }
    nav a:hover { background: #e8f0fe; }
    main { padding: 30px 0; min-height: calc(100vh - 200px); }
    footer { background: #1e3a5f; color: white; text-align: center; padding: 20px 0; margin-top: 40px; }
    footer a { color: #90cdf4; text-decoration: none; }
    .book-card { background: white; border-radius: 8px; padding: 20px; margin-bottom: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); transition: transform 0.2s, box-shadow 0.2s; }
    .book-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .book-card h3 { color: #1e3a5f; margin-bottom: 10px; }
    .book-card a { color: #2c5282; text-decoration: none; }
    .chapter-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 15px; }
    .chapter-link { display: inline-block; padding: 6px 12px; background: #e8f0fe; color: #2c5282; text-decoration: none; border-radius: 4px; font-size: 0.9rem; transition: background 0.2s; }
    .chapter-link:hover { background: #2c5282; color: white; }
    .chapter-link.active { background: #2c5282; color: white; }
    .verse { background: white; padding: 15px 20px; margin-bottom: 15px; border-radius: 8px; border-left: 4px solid #2c5282; }
    .verse-number { display: inline-block; background: #2c5282; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.85rem; font-weight: 600; margin-right: 10px; vertical-align: super; }
    .verse-text { display: inline; color: #333; }
    .testament-section { margin-bottom: 40px; }
    .testament-title { font-size: 1.3rem; color: #1e3a5f; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #2c5282; }
    .chapter-nav { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
    .chapter-nav a { padding: 10px 20px; background: #2c5282; color: white; text-decoration: none; border-radius: 4px; transition: background 0.2s; }
    .chapter-nav a:hover { background: #1e3a5f; }
    @media (max-width: 768px) { header h1 { font-size: 1.4rem; } .chapter-nav { flex-direction: column; gap: 10px; } .verse { padding: 12px 15px; } }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <h1>Vua James</h1>
      <p class="subtitle">Kinh Thánh Tiếng Việt - Phiên dịch theo truyền thống King James</p>
    </div>
  </header>
  <nav>
    <div class="container">
      <div class="nav-links">
        <a href="/">Trang chủ</a>
        ${navLinks}
      </div>
    </div>
  </nav>
  <main class="container">
    ${content}
  </main>
  <footer>
    <div class="container">
      <p>Vua James (VJ) - KJV to Vietnamese Translation</p>
      <p>CC0 1.0 Universal — Public Domain</p>
    </div>
  </footer>
</body>
</html>`;
}

function getHomePage(books: Book[], ntBooks: Book[], otBooks: Book[]): string {
  const bookCard = (book: Book) => `
    <div class="book-card">
      <h3><a href="/book/${book.id}">${book.name}</a></h3>
      <div class="chapter-list">
        ${book.chapters.map(ch =>
          `<a href="/book/${book.id}/${ch}" class="chapter-link">Chương ${ch}</a>`
        ).join('')}
      </div>
    </div>`;

  return getBaseHtml('Vua James - Vietnamese Bible Translation', `
    <div class="testament-section">
      <h2 class="testament-title">Cựu Ước (Old Testament)</h2>
      ${otBooks.map(bookCard).join('')}
    </div>
    <div class="testament-section">
      <h2 class="testament-title">Tân Ước (New Testament)</h2>
      ${ntBooks.map(bookCard).join('')}
    </div>
  `, books);
}

function getBookPage(book: Book, chapter: { number: number; verses: Verse[] }, books: Book[]): string {
  return getBaseHtml(`${book.name} ${chapter.number}`, `
    <div class="chapter-nav">
      <div>
        <h2 style="color: #1e3a5f; margin-bottom: 10px;">${book.name}</h2>
        <p style="color: #666;">Chương ${chapter.number}</p>
      </div>
      <a href="/">← Danh sách</a>
    </div>
    <div style="margin-bottom: 30px;">
      <div class="chapter-list">
        ${book.chapters.map(ch =>
          ch === chapter.number
            ? `<span class="chapter-link active">${ch}</span>`
            : `<a href="/book/${book.id}/${ch}" class="chapter-link">${ch}</a>`
        ).join('')}
      </div>
    </div>
    <div style="max-width: 900px; margin: 0 auto;">
      ${chapter.verses.map(v => `
        <div class="verse">
          <span class="verse-number">${v.number}</span>
          <span class="verse-text">${v.text}</span>
        </div>
      `).join('')}
    </div>
  `, books);
}
