# split-kjv.sh Status

## Goal
Convert `translations/kjv/kjv.txt` → `[testament]/[chapter].yaml` files

- **Old Testament (Cựu Ước)**: `translations/kjv/OT-01/` through `OT-39/`
- **New Testament (Tân Ước)**: `translations/kjv/NT-01/` through `NT-27/`

## Input format
```
KJV
King James Bible...
Genesis 1:1<TAB>In the beginning...
Genesis 1:2<TAB>And the earth...
```

## Output format
```yaml
# OT-01/01.yaml (Genesis chapter 1)
1:
  1: "In the beginning..."
  2: "And the earth..."
```

## Directory structure
```
translations/kjv/
├── kjv.txt
├── OT-01/          # Genesis
│   ├── 01.yaml
│   ├── 02.yaml
│   └── ...
├── OT-02/          # Exodus
├── ...
├── OT-39/          # Malachi
├── NT-01/          # Matthew
├── NT-02/          # Mark
├── ...
└── NT-27/          # Revelation
```

## Testament book mappings

### Old Testament (OT-01 through OT-39)
1. Genesis, 2. Exodus, 3. Leviticus, 4. Numbers, 5. Deuteronomy
6. Joshua, 7. Judges, 8. Ruth, 9. 1 Samuel, 10. 2 Samuel
11. 1 Kings, 12. 2 Kings, 13. 1 Chronicles, 14. 2 Chronicles
15. Ezra, 16. Nehemiah, 17. Esther, 18. Job, 19. Psalms (Psalm)
20. Proverbs, 21. Ecclesiastes, 22. Song of Solomon
23. Isaiah, 24. Jeremiah, 25. Lamentations, 26. Ezekiel, 27. Daniel
28-39. Minor prophets (Hosea through Malachi)

### New Testament (NT-01 through NT-27)
1. Matthew, 2. Mark, 3. Luke, 4. John, 5. Acts
6-18. Pauline epistles (Romans through Philemon)
19. Hebrews, 20. James, 21-22. Peter, 23-25. John, 26. Jude, 27. Revelation

## Script location
`scripts/split-kjv.sh`

## Status
✅ **COMPLETE** - Script tested and verified successful.

### Implementation details
- Uses `get_testament_code()` function for book → testament mapping
- Chapter numbers zero-padded to 2 digits: `01.yaml`, `02.yaml`, etc.
- Quote escaping handled for double quotes in text
- Handles `Psalm` (singular) naming in input file

### Results
- **66 testament directories** created (OT-01 through OT-39, NT-01 through NT-27)
- **1189 chapter files** total across all directories
- All book names parsed correctly including numbered books (1 Samuel, 2 Kings, etc.)

### Sample verification
```bash
ls translations/kjv/OT-02/06.yaml    # Exodus chapter 6
cat translations/kjv/NT-01/05.yaml   # Matthew chapter 5
```
