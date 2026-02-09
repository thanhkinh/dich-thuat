---
name: translate:write-result
version: "1.0.0"
description: Write Vietnamese translation result to standardized YAML file path
user-invocable: false
---

# Write Translation Result

This skill writes translated Vietnamese Bible text to the standardized file structure.

## Parameters

This skill receives:
- `book_name`: English book name (e.g., "Genesis", "Matthew")
- `chapter`: Chapter number (e.g., 1, 3, 22)
- `translations`: Map of verse numbers to Vietnamese translation text

## Book Code Lookup

Parse `GLOSSARY.books.yaml` to find the book code mapping:

**Examples:**
- Input: "Genesis" → Output: "OT-01"
- Input: "Exodus" → Output: "OT-02"
- Input: "Matthew" → Output: "NT-01"
- Input: "John" → Output: "NT-04"

**Lookup process:**
1. Read `GLOSSARY.books.yaml`
2. Search for the English book name in `books.old_testament[].english` or `books.new_testament[].english`
3. Extract the corresponding `code` field value

## Output Path Format

```
translations/vj/{BOOK_CODE}/{CHAPTER}.yaml
```

**Examples:**
- Genesis 3 → `translations/vj/OT-01/03.yaml`
- Matthew 5 → `translations/vj/NT-01/05.yaml`
- Revelation 22 → `translations/vj/NT-27/22.yaml`

## Directory Creation

If the book code directory doesn't exist, create it first:
```bash
mkdir -p translations/vj/{BOOK_CODE}/
```

## YAML File Structure

Files must follow this exact format (matching `translations/vj/OT-01/01.yaml`):

```yaml
---
book: $vietnamese_book_name
chapter: $chapter_number
revisions:
  - date: $ISO_8601_UTC_DATE (e.g., 2026-02-09T14:59:03Z)
    description: Initial translation
    model: claude-3-7-sonnet-20250219
---
{chapter_number}:
  1: "Verse 1 translation text"
  2: "Verse 2 translation text"
  3: "Verse 3 translation text"
  ...
```

**Key points:**
- Top-level key is the chapter number
- Nested keys are verse numbers
- Values are verse translations in quotes
- No verse numbers in the translation text itself

## What NOT to Create

**Do NOT create:**
- Files in book name directories (e.g., `translations/vj/Genesis/`, `translations/vj/Matthew/`)
- Paragraph-level .txt files
- Files with .txt extension (only .yaml)
- Files with book names in the path (must use BOOK_CODE)

## Example

Given:
- book_name: "Genesis"
- chapter: 3
- translations: {1: "Lúc khởi đầu...", 2: "Và đất là hoang vu..."}

Steps:
1. Lookup "Genesis" in GLOSSARY.books.yaml → code: "OT-01"
2. Create directory: `mkdir -p translations/vj/OT-01/`
3. Write file `translations/vj/OT-01/03.yaml`:
   ```yaml
   3:
     1: "Lúc khởi đầu..."
     2: "Và đất là hoang vu..."
   ```
