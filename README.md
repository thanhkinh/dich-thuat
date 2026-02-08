# Vua JAMES

**Translation Name: VJ (Vua James)** — Vietnamese version following King James tradition

CC0 1.0 Universal — Public Domain

## Project

**Status:** Active Development

**VJ (Vua James)** — KJV to Vietnamese translation following NKJV Complete Equivalence principle. Focus: consistent Protestant terminology using structured glossary with context-aware term selection.

**Current:** Revelation chapters 1-3 (71 verses)

## Contributing

### Glossary
All translations MUST reference `GLOSSARY.yaml` (primary) for term consistency and context-aware selection.

Key terms:
- LORD (YHWH) → THIÊN CHÚA
- Lord (Adonai) → Chúa
- God → Đức Chúa Trời
- Christ → Cơ-đốc
- Holy Spirit → Đức Thánh Linh
- church → Hội Thánh
- gospel → Phúc Âm

See `GLOSSARY.yaml` for complete list with context rules and decision trees.

### Translation Process

1. Claim a chapter/verse range
2. Use `/translate:do` skill
3. Cross-reference GLOSSARY terms
4. Submit PR for review

### Review

Use `/translate:review` skill. Checks:
- Glossary term consistency
- Literary Vietnamese form
- KJV equivalence fidelity

### Skills Located in `.claude/skills/`

- `translate:do` — Main translation workflow
- `translate:review` — Review translated content
- `glossary` — Update/validate term mappings

## Structure

```
├── GLOSSARY.yaml         # Master glossary (divine names, theological terms, prayer verbs)
├── GLOSSARY.people.yaml  # Biblical person names
├── GLOSSARY.books.yaml   # Bible book titles
├── GLOSSARY.cities.yaml  # Cities and places
├── samples/              # Translated chapters
└── .claude/skills/       # Translation/review tools
```

## License

CC0 1.0 Universal — No rights reserved. Freely use, modify, distribute for any purpose.
