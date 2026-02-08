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

### 1. GLOSSARY.md Compliance
- [ ] All key terms match /GLOSSARY.md mappings
- [ ] Divine names: LORD (Thiên Chúa), Lord (Chúa), God (Đức Chúa Trời)
- [ ] Theological terms used correctly (cứu rỗi, công chính, ân điển, etc.)

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
- [Any deviations from GLOSSARY.md]

COMPLETENESS: [PASS/FAIL]
- [Any missing or simplified information]

VIETNAMESE QUALITY: [PASS/NEEDS IMPROVEMENT]
- [Issues with naturalness, rhythm, dignity]

PRONOUNS/ADDRESS: [PASS/FAIL]
- [Any pronoun errors]

SPECIFIC ISSUES:
1. [Issue] - [Suggested fix if applicable]
2. ...

SUGGESTED REVISION:
[Better translation if FAIL/NEEDS REVISION]
```

## Severity Levels

- **PASS**: Meets all Complete Equivalence standards
- **NEEDS REVISION**: Minor issues; core meaning intact
- **FAIL**: Major theological error, missing information, or wrong context

## Critical Fail Criteria

- Wrong divine name (LORD → Chúa not Thiên Chúa)
- Missing key theological concept
- Wrong prayer context verb (kêu gọi instead of kêu cầu)
- Simplified/modernized archaic term
