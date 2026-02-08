---
name: translate:revise
description: Revise Vietnamese translation of KJV and update GLOSSARY files
---

# Revise Translation & Update GLOSSARY

Interactive skill for revising Vietnamese translations of KJV Bible text and maintaining GLOSSARY files.

## Purpose

1. **Discuss with user** - Understand revision context and goals
2. **Revise translation** - Improve existing Vietnamese translation
3. **Update GLOSSARY** - Add new terms or update existing entries

## Usage

User invokes skill and provides:
- Original KJV verse text
- Existing Vietnamese translation
- Description of issue or desired improvement

## Discussion Phase

Before revising, discuss with user to understand:

1. **What needs revision?**
   - Theological accuracy concern?
   - Vietnamese naturalness issue?
   - New term not in GLOSSARY?
   - Context-specific translation needed?

2. **What is the context?**
   - Prayer vs narrative?
   - Human speaking to God vs God speaking?
   - Poetry vs prose?
   - Specific verse reference?

3. **What is the goal?**
   - Fix specific error?
   - Improve flow/naturalness?
   - Add new GLOSSARY entry?
   - Update existing entry?

## Revision Guidelines

Follow **Complete Equivalence** principle:
- Preserve ALL information from KJV
- Use dignified literary Vietnamese (trang trọng)
- Apply GLOSSARY.yaml term mappings
- Follow decision trees for context-dependent terms
- Match register level to text type

### Key Considerations

1. **GLOSSARY Compliance**
   - Check existing entries before revising
   - Use decision trees for context-dependent terms
   - Respect avoid lists

2. **Prayer Context Verbs**
   - Human → God: kêu cầu, cầu xin, cầu nguyện, khóc van
   - God → Human: đáp lời, cho biết, bày tỏ

3. **Pronouns**
   - God/Jesus: Ngài
   - Humans (3rd): người, các ngươi
   - God speaking (1st): Ta / Chúng Ta

4. **Undefined Terms**
   - Flag significant terms needing standardization
   - Consider adding to GLOSSARY after discussion

## Output Format

After discussion, provide:

### If Revising Translation:
```
REVISED TRANSLATION:
[Vietnamese text]

CHANGES MADE:
- [What changed and why]

GLOSSARY ENTRIES APPLIED:
- [Term]: [Mapping used]
```

### If Updating GLOSSARY:
```
GLOSSARY UPDATE PROPOSAL:
- File: [GLOSSARY.yaml / GLOSSARY.people.yaml / etc.]
- Action: [ADD / UPDATE]

Entry:
```yaml
- term: "[English term]"
  category: "[category]"
  translations:
    - vietnamese: "[Vietnamese translation]"
      register: "[sacred/elevated/formal/neutral/classical]"
      context: "[context description]"
      primary: true
  notes: "[Any notes]"
```

REASONING:
[Why this entry is needed or how it improves translation]
```

## GLOSSARY Files

- `/GLOSSARY.yaml` - Divine names, theological terms, prayer verbs, general vocabulary
- `/GLOSSARY.people.yaml` - Person names
- `/GLOSSARY.books.yaml` - Bible book titles
- `/GLOSSARY.cities.yaml` - Cities and places

## GLOSSARY Update Process

1. **Identify need** - Term not in GLOSSARY or existing entry inadequate
2. **Propose entry** - Show user the YAML entry with reasoning
3. **Confirm with user** - Get approval before modifying files
4. **Update file** - Use Edit tool to modify GLOSSARY file
5. **Verify** - Check YAML syntax and consistency

## When to Add New Terms

Add new GLOSSARY entries when:
- Significant theological term not yet defined
- New divine name or title encountered
- Context-dependent translation pattern identified
- Existing entry doesn't cover current use case
- User requests standardization of specific term

Do NOT add entries for:
- Common vocabulary (e.g., "nước", "ngày", "đất")
- Obvious grammatical particles
- Context-obvious words

## Example Interaction

**User:** "The translation 'Ngài kêu gọi tôi' doesn't feel right for prayer context."

**Response:** Let me discuss this with you:

1. **Context:** Is this human speaking TO God in prayer?
2. **Current GLOSSARY entry for "call":**
   - Human to God: "kêu cầu"
   - Non-prayer: "kêu gọi"
   - Decision tree applies based on context

3. **Issue:** "kêu gọi" is marked for "NOT prayer" contexts

**Proposed revision:** "Ngài kêu cầu Ta" or "Ngài cầu xin Ta"

Which better fits the verse context? Or should we discuss the KJV original first?

---

**User:** "I need to add a term for 'justified'."

**Response:** Let me propose a GLOSSARY entry:

**GLOSSARY UPDATE PROPOSAL:**
- File: GLOSSARY.yaml
- Action: ADD

Entry:
```yaml
- term: "justified"
  category: "soteriology"
  translations:
    - vietnamese: "được xưng công chính"
      register: "elevated"
      primary: true
  notes: "Passive - declared righteous by God"
```

**REASONING:**
- "xưng công chính" is traditional Protestant term
- Passive form "được xưng" reflects Greek passive voice
- Fits soteriology category with salvation/justification concepts

Does this look correct? Should I add this to GLOSSARY.yaml?
