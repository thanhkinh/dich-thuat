---
name: translate:find-source
version: "1.0.0"
description: Find KJV source file path for a book and chapter
user-invocable: false
---

# Find KJV Source File Path

This skill locates the KJV source file path for a given book and chapter.

## Parameters

- `book_name`: English book name (e.g., "Genesis", "Matthew", "Revelation")
- `chapter`: Chapter number (e.g., 1, 5, 22)

## Process

1. Read `GLOSSARY.books.yaml` to find the book code
2. Search in `books.old_testament` or `books.new_testament` for matching `english` name
3. Extract the `code` field (e.g., "OT-01", "NT-01")
4. Construct source file path: `translations/kjv/{BOOK_CODE}/{CHAPTER}.yaml`
5. Format chapter number with leading zero if needed (01, 02, etc.)

## Return Value

Returns the full path to the KJV source file.

## Examples

| book_name | chapter | Output |
|-----------|---------|--------|
| Genesis | 1 | `translations/kjv/OT-01/01.yaml` |
| Matthew | 5 | `translations/kjv/NT-01/05.yaml` |
| Revelation | 22 | `translations/kjv/NT-27/22.yaml` |
| Psalms | 23 | `translations/kjv/OT-19/23.yaml` |
| John | 3 | `translations/kjv/NT-04/03.yaml` |
