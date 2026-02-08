---
name: translate:do
description: Translate KJV to Vietnamese following Complete Equivalence
---

# Translate KJV to Vietnamese

Translate King James Version Bible text to Vietnamese following NKJV "Complete Equivalence" principle.

## CRITICAL: Always Use Planning

**MANDATORY**: Before starting any translation work, ALWAYS invoke `planning-with-files` skill first.

The planning workflow creates:
- `task_plan.md` - Translation plan
- `findings.md` - Research notes
- `progress.md` - Translation progress

This ensures systematic, trackable translation work with full context preservation.

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

### Text Types
- Poetry: Preserve parallelism, use natural Vietnamese poetic rhythm
- Prose: Standard literary Vietnamese
- Maintain verse structure where possible

### Verse Format
- Do not include verse numbers in translation text
- User provides context separately if needed

## Input Format

User provides KJV verse text.

## Output Format

Return Vietnamese translation only. No commentary unless asked.

## Example

Input: "For God so loved the world, that he gave his only begotten Son"

Output: "Vì Thiên Chúa đã quá yêu thế gian đến nỗi đã ban Con độc sanh của Ngài"
