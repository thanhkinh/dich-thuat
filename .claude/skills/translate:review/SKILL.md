---
name: translate:review
description: Critically review KJV to Vietnamese Translation
---

# Critical Review: KJV to Vietnamese Translation

Reviews Vietnamese translation of KJV Bible text against "Complete Equivalence" standards.

## Purpose

Critically evaluate translation output for:
1. **Theological accuracy** - terms preserved per GLOSSARY.md
2. **Completeness** - no information lost from KJV
3. **Vietnamese quality** - natural, dignified literary form
4. **Pronoun correctness** - divine vs human address
5. **Prayer context verbs** - appropriate to speaker

## Review Checklist

### 1. GLOSSARY Compliance
- [ ] All key terms match GLOSSARY.yaml entries
- [ ] Decision trees followed for context-dependent terms
- [ ] Register levels appropriate to text type
- [ ] Divine names: LORD (Thiên Chúa), Lord (Chúa), God (Đức Chúa Trời)
- [ ] Theological terms used correctly (cứu rỗi, công chính, ân điển, etc.)
- [ ] No terms from "avoid" lists used
- [ ] Alternatives match "use_when" conditions
- [ ] City/place names per GLOSSARY.cities.yaml
- [ ] Person names per GLOSSARY.people.yaml
- [ ] Book titles per GLOSSARY.books.yaml

### 2. Completeness (Complete Equivalence)
- [ ] ALL KJV information preserved
- [ ] No simplification of theological concepts
- [ ] No modernization of archaic terms
- [ ] Hebrew idioms maintained with imagery

### 3. Vietnamese Literary Quality
- [ ] Natural, dignified language (trang trọng)
- [ ] Appropriate rhythm/cadence for text type (poetry/prose)
- [ ] No awkward word-for-word literalisms
- [ ] No over-dynamic thought-for-thought paraphrasing

### 4. Pronouns & Address
- [ ] God/Jesus: Ngài
- [ ] Humans (3rd): người, các ngươi, họ
- [ ] God speaking (1st): Ta / Chúng Ta
- [ ] Humans speaking (1st): ta / chúng ta / tôi

### 5. Prayer Context Verbs
- [ ] Human → God: kêu cầu, cầu xin, cầu nguyện, khóc van
- [ ] God → Human: đáp lời, cho biết, bày tỏ
- [ ] NOT used: kêu gọi (for prayer), báo (for God revealing)

### 6. Biblical Proper Names
- [ ] City/place names per GLOSSARY.cities.yaml
- [ ] Person names per GLOSSARY.people.yaml (including Jesus)
- [ ] Book titles per GLOSSARY.books.yaml
- [ ] Book titles vs sentence forms (e.g., Revelation: Khải Thị Lục vs revelation: sự mặc khải)

### 7. Undefined Terms Detection
- [ ] Flag significant Vietnamese terms not in GLOSSARY
- [ ] Prioritize: theological words, divine references, key concepts
- [ ] Ignore: common words, grammatical particles, obvious context words

## Input Format

User provides:
1. Original KJV verse text
2. Vietnamese translation to review

## Output Format

Return structured review:

```
CRITICAL REVIEW: [Verse reference if provided]

VERDICT: [PASS / NEEDS REVISION / FAIL]

GLOSSARY COMPLIANCE: [PASS/FAIL]
- [Any deviations from GLOSSARY.yaml entries]
- [Decision tree violations - context mismatch]
- [Register level issues]
- [Terms from avoid lists detected]

COMPLETENESS: [PASS/FAIL]
- [Any missing or simplified information]

VIETNAMESE QUALITY: [PASS/NEEDS IMPROVEMENT]
- [Issues with naturalness, rhythm, dignity]

PRONOUNS/ADDRESS: [PASS/FAIL]
- [Any pronoun errors]

UNDEFINED TERMS: [LIST or NONE]
- [Vietnamese term] - potential for standardization (suggest: check if ...)

CONTEXT ISSUES:
- [Wrong alternative chosen for context]
- [use_when condition not met]

SPECIFIC ISSUES:
1. [Issue] - [Suggested fix if applicable]
2. ...

SUGGESTED REVISION:
[Better translation if FAIL/NEEDS REVISION]
```

## Severity Levels

- **PASS**: Meets all Complete Equivalence standards; no undefined terms
- **NEEDS REVISION**: Minor issues OR undefined terms requiring standardization
- **FAIL**: Major theological error, missing information, or wrong context

## Critical Fail Criteria

- Wrong divine name (LORD → Chúa not Thiên Chúa)
- Missing key theological concept
- Wrong prayer context verb (kêu gọi instead of kêu cầu)
- Simplified/modernized archaic term
