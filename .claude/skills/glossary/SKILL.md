# Manage GLOSSARY.md

Interactive skill to add, update, or delete Vietnamese Protestant terminology entries in glossary files.

## Files
- /GLOSSARY.md - Theological terms
- /GLOSSARY.cities.md - Cities & places
- /GLOSSARY.people.md - Person names
- /GLOSSARY.books.md - Bible book titles

## Usage

Invoke with: `/glossary [optional: term to edit]`

Or without arguments for general glossary management.

## Workflow

### Step 1: Action Selection

First, ask user what action to perform:

**Question:** What would you like to do with the glossary?

**Options:**
1. Add new term
2. Update existing term
3. Delete entry
4. View all entries (no-op, just display)

### Step 2: Category Selection (for Add/Update)

For additions or updates, select category:

**Question:** Which category does this term belong to?

**Options:**
1. Divine Names (LORD, Lord, God, Holy Spirit, etc.) - GLOSSARY.md
2. Theological Terms (salvation, righteousness, grace, etc.) - GLOSSARY.md
3. Eschatology (heaven, hell, Kingdom) - GLOSSARY.md
4. Ecclesiology (gospel, church) - GLOSSARY.md
5. Ministry & People (angel, apostle, etc.) - GLOSSARY.md
6. Christological Titles - GLOSSARY.md
7. Soteriology (salvation-related) - GLOSSARY.md
8. Prayer Context Verbs - GLOSSARY.md
9. General Vocabulary - GLOSSARY.md
10. City/Place Names - GLOSSARY.cities.md
11. Person Names - GLOSSARY.people.md
12. Bible Book Titles - GLOSSARY.books.md

### Step 3: Term Entry

**Question:** Provide the term details

**Options:**
1. Suggest from common KJV terms (list top 20 common terms)
2. Enter custom term (Other - user provides)

For custom term entry, collect:
- **English term**: (required)
- **Vietnamese translation**: (required)
- **Notes/Context**: (optional - e.g., "use X in prayer context only")

### Step 4: Confirmation

**Question:** Confirm the glossary entry

Display proposed entry format and ask for confirmation before writing.

## Output Format

Entries are added to /GLOSSARY.md in this format:

```markdown
- [English] -> [Vietnamese]
```

Or with notes:
```markdown
- [English] -> [Vietnamese] ([note])
```

## Current Categories

**GLOSSARY.md:**
- Divine Names
- Theological Terms
- Eschatology
- Ecclesiology
- Ministry & People
- Christological Titles
- Soteriology
- Prayer Context Verbs
- General Vocabulary

**GLOSSARY.cities.md:**
- Cities
- Places (geographical features)

**GLOSSARY.people.md:**
- Biblical figures

**GLOSSARY.books.md:**
- Bible book titles

## Common KJV Terms (Suggestions)

When user selects "Suggest from common KJV terms", offer:

**Divine:** Father, Spirit, Almighty, Everlasting
**Theological:** justification, sanctification, redemption, reconciliation, prophecy, covenant, testament, resurrection, ascension, tribulation, glory, dominion, power, authority
**Salvation:** redeemed, justified, sanctified, saved, born again, regeneration
**Verbs:** bless, praise, worship, glorify, magnify, exalt

## File Safety

- Always read the target glossary file before modifying
- Preserve existing structure and formatting
- Sort new entries alphabetically within categories
- Remove duplicates if term already exists
