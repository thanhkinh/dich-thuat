---
name: translate:do
description: Translate KJV to Vietnamese following Complete Equivalence
---

# Translate KJV to Vietnamese

Translate King James Version Bible text to Vietnamese following NKJV "Complete Equivalence" principle.

## CRITICAL: Always Use Planning

**MANDATORY**: Before starting ANY translation work, ALWAYS invoke the `planning-with-files` skill first.

The planning workflow creates:
- `task_plan.md` - Translation plan with phases
- `findings.md` - Research notes on terms, context, decisions
- `progress.md` - Translation progress tracking

This ensures systematic, trackable translation work with full context preservation.

## CRITICAL: Check for Existing Translation

**Before ANY translation work, check if the target file already exists.**

If the file exists, **REFUSE to translate** and inform the user:
```
Translation file already exists: translations/vj/{BOOK_CODE}/{CHAPTER}.yaml
Use /translate:revise to modify existing translations.
```

**Pre-flight check process:**
1. Use the `translate:find-source` skill to get the KJV source file path
2. Look up the book code from `GLOSSARY.books.yaml` (e.g., "Genesis" → "OT-01")
3. Construct the target file path: `translations/vj/{BOOK_CODE}/{CHAPTER}.yaml`
4. Check if the file exists using the Read tool or Bash `test -f` command
5. If file exists, stop and refuse to proceed
6. If file does NOT exist, proceed with translation

**Examples:**
- `/translate:do Genesis 1` → Check `translations/vj/OT-01/01.yaml` → exists → REFUSE
- `/translate:do Genesis 50` → Check `translations/vj/OT-01/50.yaml` → does not exist → PROCEED
- `/translate:do Matthew 5` → Check `translations/vj/NT-01/05.yaml` → exists → REFUSE

### Task Splitting: Paragraph-Based

**Split translation work by paragraph: 1 task ≈ 1 paragraph**

When creating `task_plan.md`, break the translation into discrete paragraph-level tasks:
- Each paragraph (or logical verse group) = one phase/task
- Small paragraphs may be grouped (2-3 related paragraphs)
- Long paragraphs may be split by natural clause breaks

**Example task_plan.md structure:**
```markdown
## Phases
- [ ] Phase 1: Paragraph 1 (verses 1-3) - Opening greeting
- [ ] Phase 2: Paragraph 2 (verses 4-6) - Prophetic oracle
- [ ] Phase 3: Paragraph 3 (verses 7-10) - Vision description
```

**Benefits:**
- Manageable context per translation unit
- Easy progress tracking
- Can resume work at paragraph boundaries
- Facilitates focused review per unit

## Principle

**Complete Equivalence**: Preserve ALL information in original text while presenting it in good literary Vietnamese form.

- Not word-for-word literal (loses meaning)
- Not thought-for-thought dynamic (loses information)
- Balance: accurate + natural Vietnamese

## Guidelines

1. **Preserve all theological terms** - don't simplify or modernize
2. **Keep Hebrew idioms** - maintain original imagery
3. **Vietnamese literary form** - use respectful, dignified language (ngôn ngữ trang trọng)
4. **Maintain verse structure** - keep similar rhythm/cadence when possible
5. **Key terms consistency** - use standard Vietnamese Protestant terminology

## Key Term Mapping

CRITICAL: Before translating, read GLOSSARY.yaml and apply all term mappings following these principles:

1. **Load YAML structure** - Parse metadata, categories, rules, and terms
2. **Identify term category** - Match each source term to its category
3. **Check decision trees** - Use decision_tree field for context-dependent selection
4. **Apply register hierarchy** - Match register level to text type (prayer vs narrative)
5. **Follow usage rules** - Respect use_when conditions for alternatives
6. **Check avoid lists** - Never use terms in avoid sections

Glossary files:
- /GLOSSARY.yaml (divine names, theological terms, prayer verbs)
- /GLOSSARY.people.yaml (person names)
- /GLOSSARY.books.yaml (Bible book titles)
- /GLOSSARY.cities.yaml (cities, places)

## Translation Guidelines

### Prayer Context Verbs
When humans speak TO God:
- Call unto me -> Kêu cầu Ta / Cầu xin Ta (not kêu gọi)
- Cry unto -> Kêu khấn / Khóc van (per decision_tree in GLOSSARY.yaml)
- Pray -> Cầu nguyện / Cầu xin

When God speaks/shows:
- Answer (God responding) -> Đáp lời
- Show/Shew -> Cho biết / Bày tỏ / Chỉ cho (per decision_tree in GLOSSARY.yaml, never báo)

**Decision Tree Process:**
1. Identify context (prayer vs narrative, human→God vs God→human)
2. Check GLOSSARY.yaml decision_tree for term
3. Evaluate conditions in order
4. Select translation matching first true condition
5. Verify register matches text type

### Pronouns
- Third person (God/Jesus): Ngài
- Third person (humans): người, các ngươi
- First person (God): Ta / Chúng Ta
- First person (human): ta / chúng ta / tôi

### CRITICAL: Grammatical Particles & Possessives
**ALWAYS preserve these - they carry meaning:**

- **"of"** → **"của"** (possessive - Lord's day = ngày của Chúa)
- **"all/every"** → **"mọi"** (not just omitting)
- **plural markers** → **"các"**, **"những"** (when English has plural)

**Examples:**
- "Lord's day" → "ngày của Chúa" (NOT "ngày Chúa")
- "all the churches" → "mọi Hội Thánh" or "các Hội Thánh"
- "word of God" → "lời Đức Chúa Trời" or "lời của Đức Chúa Trời"

**Common KJV possessive patterns requiring "của":**
- X's Y (X of God/Y of the Lord) → Y của X
- Y of X → Y của X

### Text Types
- Poetry: Preserve parallelism, use natural Vietnamese poetic rhythm
- Prose: Standard literary Vietnamese
- Maintain verse structure where possible

### Verse Format
- Do not include verse numbers in translation text
- User provides context separately if needed

## Input Format

Source text is obtained from KJV files using the `translate:find-source` skill.

To get the source text:
1. Invoke `translate:find-source` with book_name and chapter
2. Read the returned KJV source file
3. Extract verses to translate

## Output Format

Return Vietnamese translation only. No commentary unless asked.

## CRITICAL: Writing Results

After translation, **MUST use the `translate:write-result` skill** to save the translation to file.

The `translate:write-result` skill handles:
- Book code lookup from GLOSSARY.books.yaml
- Correct output directory structure
- YAML file format
- Directory creation

**Usage:**
```
Invoke the translate:write-result skill with:
- book_name: English book name (e.g., "Genesis")
- chapter: Chapter number (e.g., 3)
- translations: Map of verse numbers to Vietnamese text
```

## Example

Input: "For God so loved the world, that he gave his only begotten Son"

Output: "Vì Thiên Chúa đã quá yêu thế gian đến nỗi đã ban Con độc sanh của Ngài"
