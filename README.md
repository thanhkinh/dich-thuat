# Vietnamese Protestant Bible Translation

CC0 1.0 Universal — Public Domain

## Project

KJV to Vietnamese translation following NKJV Complete Equivalence principle. Focus: consistent Protestant terminology.

**Current:** Revelation chapters 1-3 (71 verses)

## Contributing

### Glossary
All translations MUST reference `GLOSSARY.md` for term consistency.

Key terms:
- LORD (YHWH) → THIÊN CHÚA
- Lord (Adonai) → Chúa
- God → Đức Chúa Trời
- Christ → Cơ-đốc
- Holy Spirit → Đức Thánh Linh
- church → Hội Thánh
- gospel → Phúc Âm

See `GLOSSARY.md` for complete list.

### Translation Process

1. Claim a chapter/verse range
2. Use `/translate-kjv-vi` skill
3. Cross-reference GLOSSARY terms
4. Submit PR for review

### Review

Use `/review-kjv-vi` skill. Checks:
- Glossary term consistency
- Literary Vietnamese form
- KJV equivalence fidelity

### Skills Located in `.claude/skills/`

- `translate-kjv-vi` — Main translation workflow
- `review-kjv-vi` — Review translated content
- `glossary` — Update/validate term mappings

## Structure

```
├── GLOSSARY.md           # Master term list
├── GLOSSARY.*.md         # Categorized terms
├── samples/              # Translated chapters
└── .claude/skills/       # Translation/review tools
```

## License

CC0 1.0 Universal — No rights reserved. Freely use, modify, distribute for any purpose.
