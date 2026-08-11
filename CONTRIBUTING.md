# Contributing

The goal of this repository is technically accurate, beginner-friendly networking education.

## Before opening a pull request

1. Name the related N10-009 objective in the PR description.
2. Use RFCs, standards, or primary vendor documentation for protocol behavior.
3. Start with a plain-English definition, then explain operation, examples, and failure modes.
4. Place commands in fenced code blocks and explain every important line below them.
5. Use `realsam.ir`, RFC 1918 addresses, and documentation-only public ranges in examples.
6. Never commit credentials, real sensitive IP addresses, private captures, or exam dumps.
7. Practice questions must be original and include an explained answer.
8. Run the documentation checks:

```bash
npm run check
```

The validator checks required files, internal links, code fences, all 25 objectives, 200 questions, 26 labs, and rejects Persian/Arabic-script characters so the repository remains consistently English.

## Writing style

- Prefer plain English and define acronyms at first use.
- Avoid false absolutes such as "DNS always uses UDP."
- Identify insecure legacy protocols and provide the safer replacement.
- Verify lab results with counters, tables, logs, or packet captures.
