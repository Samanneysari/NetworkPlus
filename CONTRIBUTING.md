# Contributing

The goal of this repository is technically accurate, beginner-friendly networking education.

## Before opening a pull request

1. Search every lesson, lab, question, answer, appendix, glossary entry, and synonym before adding a topic.
2. Decide whether the topic is complete, incomplete, or absent. Improve the canonical section instead of creating duplicate explanations.
3. Place prerequisite concepts before dependent concepts; create a new lesson only when the topic needs an independent learning path.
4. Name the related N10-009 objective in the PR description.
5. Use RFCs, standards, or primary vendor documentation for protocol behavior.
6. Start with a plain-English definition, then explain purpose, operation, components, and the full data path.
7. Add a safe practical example when the topic can be observed or configured.
8. Place commands in fenced code blocks and explain every important line below them.
9. State expected results, positive/negative verification, common failures, evidence, and rollback where a change occurs.
10. Update related navigation, objectives, labs, exercises, glossary, summary, references, and validation rules.
11. Use `realsam.ir`, RFC 1918 addresses, and documentation-only public ranges in examples.
12. Never commit credentials, real sensitive IP addresses, private captures, or exam dumps.
13. Practice questions must be original and include an explained answer.
14. Keep one focused, reversible commit per coherent topic.
15. Run the documentation checks:

```bash
npm run check
```

The validator checks required files, internal links, code fences, foundation-topic coverage, all 25 objectives, detailed v6.0 sections, 200 topic questions, four 90-question exams and answer keys, PBQs, command-output cases, 26 guided labs, lab-pack assets, and complete acronym entries. It rejects Persian/Arabic-script characters so the repository remains consistently English.

## Writing style

- Prefer plain English and define acronyms at first use.
- Avoid false absolutes such as "DNS always uses UDP."
- Identify insecure legacy protocols and provide the safer replacement.
- Verify lab results with counters, tables, logs, or packet captures.
