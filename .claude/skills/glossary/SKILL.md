# Manage GLOSSARY.yaml

Interactive skill to add, update, or delete Vietnamese Protestant terminology entries in GLOSSARY.yaml.

## File
- /GLOSSARY.yaml - Structured YAML glossary with metadata, categories, decision trees, register levels, usage rules

## Usage

Invoke with: `/glossary [optional: term to edit]`

Or without arguments for general glossary management.

## YAML Structure Reference

```yaml
terms:
  - term: "english_term"
    category: "category_name"
    variants: ["alt1", "alt2"]  # optional
    translations:
      - vietnamese: "Vietnamese translation"
        register: "sacred|elevated|formal|neutral|classical"
        context: "Usage context"
        use_when: "Specific condition"
        primary: true  # marks default translation
    alternatives:
      - vietnamese: "Alternative translation"
        use_when: "Condition for using this alternative"
    decision_tree:
      - condition: "Context condition"
        use: "Translation to use"
    avoid:
      - term: "term to avoid"
        reason: "Why to avoid it"
    notes: "Additional information"
```

## Categories

1. **divine_names** - Divine Names and Titles
2. **theological** - Theological Terms
3. **eschatology** - Eschatology (Last Things)
4. **ecclesiology** - Ecclesiology (Church)
5. **ministry** - Ministry & People
6. **christological** - Christological Titles
7. **soteriology** - Soteriology (Salvation)
8. **prayer_verbs** - Prayer Context Verbs
9. **general** - General Vocabulary

## Register Levels

- **sacred**: Divine names, direct address to God
- **elevated**: Theological concepts, sacred narratives
- **formal**: Standard biblical prose
- **neutral**: Common narrative, descriptions
- **classical**: Archaic terms, traditional Protestant phrasing

## Workflow

### Step 1: Action Selection

**Question:** What would you like to do with the glossary?

**Options:**
1. Add new term
2. Update existing term
3. Delete entry
4. View all entries (no-op, just display)

### Step 2: Category Selection (for Add/Update)

**Question:** Which category does this term belong to?

**Options:**
1. Divine Names (LORD, Lord, God, Holy Spirit, etc.)
2. Theological Terms (salvation, righteousness, grace, etc.)
3. Eschatology (heaven, hell, Kingdom)
4. Ecclesiology (gospel, church)
5. Ministry & People (angel, apostle, etc.)
6. Christological Titles
7. Soteriology (salvation-related)
8. Prayer Context Verbs
9. General Vocabulary

### Step 3: Term Entry

Collect term details:
- **English term**: (required)
- **Variants**: (optional - comma-separated alternate spellings)
- **Vietnamese translation(s)**: (required - can add multiple)
- **Register level**: (required - sacred/elevated/formal/neutral/classical)
- **Primary translation**: (which one is default?)
- **Decision tree**: (optional - context-dependent choices)
- **Avoid list**: (optional - terms NOT to use with reasons)
- **Notes**: (optional)

### Step 4: Confirmation

Display proposed YAML entry and ask for confirmation before writing.

## File Safety

- Always read GLOSSARY.yaml before modifying
- Preserve YAML structure and formatting
- Sort new entries alphabetically within categories
- Update metadata.last_updated timestamp
- Validate YAML syntax before writing
