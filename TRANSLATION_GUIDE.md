# Translation Guide: AI-Assisted Workflow for Vua James

**Version:** 1.0  
**Created:** 2026-02-09  
**Purpose:** Practical guide for translators using AI assistance in the Vua James project

---

## Quick Start for Translators

### Before You Begin
1. ✅ Read `README.md` for project overview
2. ✅ Study `GLOSSARY.yaml` for key terminology
3. ✅ Review `RESEARCH_BIBLE_TRANSLATION_AI.md` for methodology
4. ✅ Familiarize yourself with `.claude/skills/` tools

### Basic Workflow
```
1. Claim chapter/verse range (GitHub issue)
2. Use /translate:do skill (invokes planning)
3. Review AI-generated draft
4. Edit and refine translation
5. Use /translate:review skill
6. Address review feedback
7. Submit PR for peer review
8. Revise based on feedback
9. Final approval and merge
```

---

## Translation Philosophy: Complete Equivalence

### Core Principles
1. **Word-for-word fidelity** to KJV text
2. **Preserve source structure** where grammatically possible
3. **Maintain Hebrew/Greek idioms** (don't over-domesticate)
4. **Consistent terminology** (use glossary strictly)
5. **Dignified literary Vietnamese** (elevated register)
6. **Theological precision** (no doctrinal shifts)

### What This Means in Practice

#### ✅ DO:
- Follow KJV word order when Vietnamese allows
- Preserve "of" constructions: "Lord's day" → "ngày của Chúa" (not "ngày Chúa")
- Keep biblical imagery: "bowels of compassion" → maintain figurative language
- Use glossary terms exactly: "LORD" → "THIÊN CHÚA" (not "Chúa")
- Maintain verb tenses/aspects from source
- Preserve all semantic content (completeness)

#### ❌ DON'T:
- Simplify for modern readers (that's dynamic equivalence)
- Replace idioms with explanations
- Restructure for clarity at expense of source structure
- Use synonyms not in glossary (consistency > variety)
- Add interpretive content
- Omit "difficult" phrases

---

## Using the Glossary

### Glossary Structure

**Primary:** `GLOSSARY.yaml`  
**Supplementary:** `GLOSSARY.people.yaml`, `GLOSSARY.books.yaml`, `GLOSSARY.cities.yaml`

### Key Glossary Features

#### 1. Context-Aware Selection
Many terms have multiple translations depending on context:

```yaml
- term: "God"
  translations:
    - vietnamese: "Thiên Chúa"
      context: "General reference, default"
      primary: true
    - vietnamese: "Đức Chúa Trời"
      use_when: "Emphasizing sovereignty, covenant relationship"
    - vietnamese: "Chúa"
      use_when: "Direct address, vocative"
```

**Rule:** Always check `context` and `use_when` fields.

#### 2. Decision Trees
For complex terms, follow the decision tree:

```yaml
- term: "love"
  decision_tree:
    - condition: "God's love (agape)"
      use: "ân ái"
    - condition: "General Christian love"
      use: "sự yêu thương"
```

**Rule:** Evaluate conditions in order, use first match.

#### 3. Register Hierarchy
All terms tagged with register level:
- **sacred:** Divine names, direct address to God
- **elevated:** Theological concepts, sacred narratives
- **formal:** Standard biblical prose
- **neutral:** Common narrative, descriptions
- **classical:** Archaic terms, traditional phrasing

**Rule:** Match register to text type (prayer → elevated/sacred; narrative → formal/neutral).

#### 4. Avoid Terms
Some entries explicitly list terms to avoid:

```yaml
avoid:
  - term: "sự cứu độ"
    reason: "Catholic term, not Protestant tradition"
```

**Rule:** NEVER use terms in "avoid" lists.

### Glossary Lookup Process

**Step 1:** Identify key terms in source text  
**Step 2:** Look up each term in GLOSSARY.yaml  
**Step 3:** Read context and decision tree  
**Step 4:** Select appropriate translation  
**Step 5:** Document if creating new glossary entry

---

## Critical: Grammatical Particles

Vietnamese grammatical particles carry theological meaning. Get these right!

### Possessive: "của"
**Rule:** "of" constructions require "của"

✅ Correct:
- "Lord's day" → "ngày của Chúa" (day OF the Lord)
- "word of God" → "lời của Thiên Chúa"
- "love of Christ" → "tình yêu của Cơ-đốc"

❌ Wrong:
- "ngày Chúa" (loses possessive relationship)
- "lời Thiên Chúa" (too casual, ambiguous)

### Plural: "các", "những"
**Rule:** Mark plurality explicitly

✅ Correct:
- "the churches" → "các Hội Thánh"
- "the angels" → "những thiên sứ"

❌ Wrong:
- "Hội Thánh" (could be singular)

### Universal: "mọi"
**Rule:** "all", "every", "whole" require "mọi"

✅ Correct:
- "all saints" → "mọi thánh đồ"
- "every word" → "mọi lời"

❌ Wrong:
- "các thánh đồ" (just "the saints", not "all")

### Dignified Classifier: "Đấng"
**Rule:** Use "Đấng" for Christ and exalted persons

✅ Correct:
- "Jesus Christ" → "Đấng Cơ-đốc Giê-xu" (first mention)
- "the Son of Man" → "Đấng Nhân Tử"

❌ Wrong:
- "Cơ-đốc Giê-xu" only (lacks dignity marker)

---

## AI-Assisted Translation Workflow

### Phase 1: Preparation

#### Claim Your Work
1. Check existing issues for unclaimed chapters
2. Create issue: "Translate [Book] [Chapter]:[Verses]"
3. Assign yourself
4. Add "in-progress" label

#### Gather Context
1. Read the chapter in KJV
2. Identify parallel passages
3. Note key terms requiring glossary lookup
4. Check if previous/following verses already translated (consistency)
5. Identify text type (narrative, poetry, prophecy, epistle, etc.)

### Phase 2: AI-Assisted Drafting

#### Using /translate:do Skill

The skill automatically:
- Invokes `/planning-with-files` for systematic approach
- Breaks work into paragraph-sized chunks
- References GLOSSARY.yaml for terms
- Generates initial draft
- Documents key decisions

**Your Role:**
- Provide clear instruction to skill
- Review generated draft carefully
- Don't blindly accept AI output
- Check every glossary term
- Verify completeness (no omissions/additions)

#### What to Check in AI Draft

**Theological Accuracy:**
- [ ] Divine names correct (LORD vs. Lord vs. God)
- [ ] Theological terms match glossary
- [ ] No doctrinal shifts

**Linguistic Correctness:**
- [ ] Vietnamese grammar correct
- [ ] Particles used correctly (của, các, mọi)
- [ ] Appropriate register maintained
- [ ] Natural Vietnamese expression

**Completeness:**
- [ ] All words translated
- [ ] No additions
- [ ] Verse/paragraph structure preserved

**Consistency:**
- [ ] Terms match previous translations
- [ ] Style consistent with completed work

### Phase 3: Human Review and Editing

#### Self-Review Process

**Step 1: Read Aloud**
- Does it sound natural?
- Is it dignified and literary?
- Any awkward phrasing?

**Step 2: Back-Translation**
- Mentally translate back to English
- Does meaning match KJV?
- Any semantic shifts?

**Step 3: Glossary Verification**
- Check EVERY key term against glossary
- Verify contextually appropriate choice
- Confirm particles correct

**Step 4: Structure Check**
- Compare with KJV structure
- Preserve source word order where possible
- Maintain parallelism and poetic devices

**Step 5: Final Polish**
- Improve naturalness without sacrificing accuracy
- Ensure appropriate register
- Verify theological soundness

#### Common Issues to Fix

**Issue 1: Wrong Glossary Term**
❌ AI uses: "Chúa" for LORD (YHWH)  
✅ Correct to: "THIÊN CHÚA"

**Issue 2: Missing Particles**
❌ AI writes: "ngày Chúa"  
✅ Correct to: "ngày của Chúa"

**Issue 3: Informal Register**
❌ AI uses casual vocabulary  
✅ Replace with elevated/formal terms

**Issue 4: Over-Simplification**
❌ AI domesticates Hebrew idiom  
✅ Preserve literal expression (add note if needed)

**Issue 5: Inconsistency**
❌ AI uses different term than previous verse  
✅ Check previous usage and maintain consistency

### Phase 4: Automated Review

#### Using /translate:review Skill

The skill checks:
- ✅ Glossary term consistency
- ✅ Literary Vietnamese form
- ✅ KJV equivalence fidelity
- ✅ Grammatical particle usage

**Output:** List of issues found

**Your Action:**
- Review each flagged issue
- Determine if valid concern
- Make corrections as needed
- Re-run review after major changes

#### Review Checklist

Use this checklist for every translation:

**Accuracy:**
- [ ] All KJV words translated
- [ ] No additions to source text
- [ ] Theological terms correct
- [ ] No meaning shifts

**Glossary Compliance:**
- [ ] All key terms from glossary
- [ ] Contextually appropriate choices
- [ ] Decision trees followed
- [ ] No avoided terms used

**Grammar and Particles:**
- [ ] Vietnamese grammar correct
- [ ] Possessive "của" where needed
- [ ] Plural markers where needed
- [ ] "mọi" for universal quantifiers
- [ ] "Đấng" for Christ and exalted persons

**Style and Register:**
- [ ] Appropriate register for text type
- [ ] Dignified literary Vietnamese
- [ ] Natural expression
- [ ] Consistent with project style

**Structure:**
- [ ] Preserves source structure
- [ ] Verse markers correct
- [ ] Paragraph breaks appropriate
- [ ] Parallelism maintained (if in source)

### Phase 5: Peer Review

#### Submitting for Review

1. Commit your work
2. Create pull request
3. Title: "Translation: [Book] [Chapter]:[Verses]"
4. Description:
   - Source passage reference
   - Key translation decisions
   - Questions for reviewers
   - Difficult passages needing expert input

#### Responding to Feedback

**Be Open:**
- Translation is collaborative
- Multiple perspectives improve quality
- Reviewer may catch mistakes you missed

**Be Thoughtful:**
- Evaluate feedback carefully
- Explain your reasoning if you disagree
- Consult glossary and resources
- Escalate to expert if needed

**Be Consistent:**
- Major decisions should update glossary
- Document new rules for future reference
- Maintain project-wide consistency

### Phase 6: Revision

#### Using /translate:revise Skill

The skill helps with:
- Implementing review feedback
- Updating GLOSSARY entries if needed
- Ensuring consistency with changes
- Documenting revision rationale

**When to Revise:**
- Peer reviewer finds issues
- You discover mistake during re-reading
- Glossary updated with new guidance
- Expert consultant provides input

---

## Advanced Techniques

### Parallel Passage Consistency

**Challenge:** Same phrase appears in multiple places  
**Solution:** Translate consistently across passages

**Example:**
- Matthew 3:2: "Repent: for the kingdom of heaven is at hand"
- Matthew 4:17: "Repent: for the kingdom of heaven is at hand"

→ Use IDENTICAL Vietnamese translation both times

**Process:**
1. Search existing translations for phrase
2. If found, use same translation
3. If not found, translate and document
4. Future instances should match

### Handling Ambiguity

**When KJV Unclear:**
1. Consult original language (Hebrew/Greek)
2. Check other formal equivalence versions (NASB, ESV)
3. Review commentaries and lexicons
4. Document ambiguity and decision
5. Add translation note if helpful

**Example:**
- Word has multiple meanings
- Consult lexicon for semantic range
- Check context for clues
- Choose most likely meaning
- Document why this choice

### Poetry and Parallelism

**Hebrew poetry features:**
- Parallelism (A / A' structure)
- Repetition for emphasis
- Metaphor and imagery

**Translation approach:**
- PRESERVE parallelism structure
- Maintain repeated words (don't vary for style)
- Keep metaphors (don't explain)
- Match literary dignity

**Example:**
```
KJV: "The LORD is my shepherd; I shall not want"
     "He maketh me to lie down in green pastures"

VJ:  "THIÊN CHÚA là người chăn của tôi; tôi sẽ không thiếu"
     "Ngài làm cho tôi nằm trong đồng cỏ xanh"
```

### Theological Terms Requiring Precision

**Justification / Sanctification:**
- Keep distinct in Vietnamese
- "công chính hóa" vs. "thánh hóa"
- Don't blend concepts

**Grace / Mercy:**
- "ân điển" vs. "sự thương xót"
- Different theological meanings
- Maintain distinction

**Faith / Faithfulness:**
- "đức tin" (both meanings)
- Context determines nuance
- May need explanatory note

**Propitiation / Expiation:**
- Complex atonement theology
- Consult theological lexicon
- Document decision carefully

---

## Quality Standards

### Acceptability Criteria

A translation is acceptable when:
- ✅ 100% glossary term compliance
- ✅ Zero theological errors
- ✅ Complete (no omissions/additions)
- ✅ Natural Vietnamese grammar
- ✅ Appropriate register maintained
- ✅ Consistent with previous work
- ✅ Peer reviewed and approved
- ✅ Automated checks pass

### Common Rejection Reasons

A translation will be rejected if:
- ❌ Uses non-glossary terms without justification
- ❌ Contains theological errors
- ❌ Omits or adds content
- ❌ Uses wrong register (too casual/too archaic)
- ❌ Inconsistent with established translations
- ❌ Fails automated consistency checks
- ❌ Contains grammatical errors

---

## Documentation Requirements

### Translation Notes

For difficult passages, document:
1. **Source ambiguity:** What makes this difficult?
2. **Options considered:** Alternative translations
3. **Decision rationale:** Why this choice?
4. **Theological implications:** Doctrinal considerations
5. **Scholarly input:** Consulted resources

**Format:**
```markdown
### [Book] [Chapter]:[Verse] - [Keyword/Phrase]

**Issue:** [Description of difficulty]

**Options:**
1. [Option 1] - [pros/cons]
2. [Option 2] - [pros/cons]

**Decision:** [Final choice]

**Rationale:** [Explanation]

**References:** [Lexicons, commentaries consulted]
```

### Glossary Updates

When creating new term entry:
1. Provide Vietnamese translation
2. Specify context/use_when conditions
3. Tag with category and register
4. Note "avoid" alternatives with reasons
5. Add examples from actual usage

**Submit via:** Pull request to GLOSSARY.yaml

---

## Troubleshooting

### "AI generated wrong glossary term"
**Solution:** AI doesn't know context; verify ALL terms manually

### "Translation sounds unnatural"
**Solution:** Read aloud; adjust word order while preserving meaning; consult native Vietnamese speakers

### "Inconsistent with previous verses"
**Solution:** Search existing translations; align terminology; update glossary if needed

### "Can't find term in glossary"
**Solution:** Check supplementary glossaries (people, places, books); if truly missing, research and propose new entry

### "Theological question beyond my knowledge"
**Solution:** Tag for expert consultation; document question in PR; don't guess on doctrine

### "Particle usage unclear"
**Solution:** Consult README examples; check GLOSSARY notes; ask peer reviewer

---

## Resources for Translators

### Internal Resources
- `README.md` - Project overview and workflow
- `GLOSSARY.yaml` - Master terminology database
- `GLOSSARY.people.yaml` - Biblical person names
- `GLOSSARY.books.yaml` - Bible book titles
- `GLOSSARY.cities.yaml` - Places and cities
- `RESEARCH_BIBLE_TRANSLATION_AI.md` - Translation methodology
- `.claude/skills/` - AI assistant tools

### External Resources

**Biblical Texts:**
- King James Version (source text)
- New King James Version (methodology reference)
- Hebrew/Greek interlinears (for difficult passages)

**Lexicons:**
- Strong's Concordance (word studies)
- Brown-Driver-Briggs (Hebrew)
- Thayer's Greek Lexicon (Greek)

**Vietnamese Reference:**
- 1925 Vietnamese Protestant Bible (tradition reference)
- Vietnamese grammar resources
- Vietnamese Protestant theological materials

**Online Tools:**
- Blue Letter Bible (blueletterbible.org)
- Bible Hub (biblehub.com)
- Bible Gateway (biblegateway.com)

---

## Best Practices Summary

### DO:
- ✅ Consult glossary for EVERY key term
- ✅ Read translation aloud to check naturalness
- ✅ Verify grammatical particles (của, các, mọi)
- ✅ Maintain consistency with previous work
- ✅ Document difficult decisions
- ✅ Ask for help when uncertain
- ✅ Review AI output critically
- ✅ Use elevated/formal register
- ✅ Preserve source structure
- ✅ Check completeness (no additions/omissions)

### DON'T:
- ❌ Blindly accept AI suggestions
- ❌ Use terms not in glossary
- ❌ Simplify for modern readers
- ❌ Omit difficult phrases
- ❌ Add interpretive content
- ❌ Guess on theological matters
- ❌ Ignore review feedback
- ❌ Use casual/informal language
- ❌ Vary terminology for style
- ❌ Rush without careful review

---

## Getting Help

### Questions About:
- **Glossary terms:** Check GLOSSARY.yaml first, then ask in PR comments
- **Theological issues:** Tag for expert consultation
- **Vietnamese grammar:** Ask native Vietnamese peer reviewers
- **AI tool usage:** Check `.claude/skills/` documentation
- **Process questions:** Refer to README.md and this guide
- **Technical issues:** Open GitHub issue

### Escalation Path:
1. Self-review and research
2. Consult documentation (README, GLOSSARY, this guide)
3. Ask peer translators
4. Request expert consultation
5. Discuss in project forum/issues

---

## Continuous Improvement

This project is a learning community. As you translate:
- Document new insights
- Propose glossary improvements
- Share difficult passage solutions
- Contribute to translation resources
- Help train new translators

Together we create a high-quality, faithful Vietnamese Bible in the King James tradition.

---

**Document Version:** 1.0  
**Last Updated:** 2026-02-09  
**Maintained By:** Vua James Translation Team
