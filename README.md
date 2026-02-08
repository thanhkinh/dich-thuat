# Vua JAMES

**Translation Name: Vua James (code: VJ)** — Vietnamese version following King James tradition

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

**CRITICAL: Grammatical particles carry meaning**
- "of" → "của" (Lord's day = ngày của Chúa)
- "all/every" → "mọi"
- plural → "các", "những"

See `GLOSSARY.yaml` for complete list with context rules and decision trees.

### Translation Process

1. Claim a chapter/verse range
2. Use `/translate:do` skill (automatically invokes `/planning-with-files` for systematic translation)
3. **Work is split by paragraph** — 1 task ≈ 1 paragraph for manageable translation units
4. Cross-reference GLOSSARY terms
5. Submit PR for review

### Review

Use `/translate:review` skill. Checks:
- Glossary term consistency
- Literary Vietnamese form
- KJV equivalence fidelity
- **CRITICAL: Grammatical particles** ("của" for possessive, "mọi" for all/every, "các" for plural)

### Skills Located in `.claude/skills/`

- `translate:do` — Main translation workflow
- `translate:review` — Review translated content
- `translate:revise` — Revise translations and update GLOSSARY entries
- `glossary` — Update/validate term mappings

## Web Application

A web application is provided to browse and view the translations:

```bash
cd webapp
bun install
bun run dev
```

Visit `http://localhost:8080` to view the translations.

See [webapp/README.md](webapp/README.md) for full documentation.

## Structure

```
├── GLOSSARY.yaml         # Master glossary (divine names, theological terms, prayer verbs)
├── GLOSSARY.people.yaml  # Biblical person names
├── GLOSSARY.books.yaml   # Bible book titles
├── GLOSSARY.cities.yaml  # Cities and places
├── .claude/skills/       # Translation/review tools
├── webapp/               # Web application for viewing translations
└── translations/
    ├── kjv/              # KJV source files
    └── vj/               # Vua James translation
```

## License

CC0 1.0 Universal — No rights reserved. Freely use, modify, distribute for any purpose.
