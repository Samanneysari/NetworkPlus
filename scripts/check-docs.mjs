import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const errors = [];

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const markdownFiles = walk(root)
  .filter((path) => extname(path) === '.md')
  .filter((path) => !path.includes(`${join(root, '.git')}`));

const required = [
  'README.md', 'COURSE.md', 'OBJECTIVES.md', 'SUMMARY.md', 'GLOSSARY.md',
  'REFERENCES.md', 'docs/00-network-from-zero.md', 'docs/01-osi-tcp-ip-tls.md',
  'docs/02-networking-concepts.md', 'docs/03-network-implementation.md',
  'docs/04-network-operations.md', 'docs/05-network-security.md',
  'docs/06-network-troubleshooting.md', 'labs/README.md',
  'practice/questions.md', 'practice/answers.md', 'practice/subnetting.md',
  'practice/subnetting-answers.md', 'appendices/ports-protocols.md',
  'appendices/commands-tools.md'
];

for (const file of required) {
  if (!existsSync(join(root, file))) errors.push(`Missing required file: ${file}`);
}

for (const path of markdownFiles) {
  const file = relative(root, path);
  const text = readFileSync(path, 'utf8');
  if (!text.endsWith('\n')) errors.push(`${file}: missing final newline`);
  if ((text.match(/```/g) ?? []).length % 2 !== 0) errors.push(`${file}: unbalanced code fences`);
  const rtlOpen = (text.match(/<div dir="rtl" align="right">/g) ?? []).length;
  const ltrOpen = (text.match(/<div dir="ltr" align="left">/g) ?? []).length;
  const closes = (text.match(/<\/div>/g) ?? []).length;
  if (rtlOpen + ltrOpen !== closes) errors.push(`${file}: unbalanced RTL/LTR divs`);
  if (!text.includes('<div dir="rtl" align="right">')) errors.push(`${file}: no RTL wrapper`);

  const links = [...text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((match) => match[1]);
  for (const target of links) {
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    const pathOnly = target.split('#')[0];
    if (!pathOnly) continue;
    const local = normalize(resolve(dirname(path), pathOnly));
    if (!local.startsWith(root) || !existsSync(local)) {
      errors.push(`${file}: broken local link ${target}`);
    }
  }
}

const objectives = readFileSync(join(root, 'OBJECTIVES.md'), 'utf8');
const expectedObjectives = [
  '1.1','1.2','1.3','1.4','1.5','1.6','1.7','1.8',
  '2.1','2.2','2.3','2.4','3.1','3.2','3.3','3.4','3.5',
  '4.1','4.2','4.3','5.1','5.2','5.3','5.4','5.5'
];
for (const code of expectedObjectives) {
  const count = (objectives.match(new RegExp(`\\| ${code.replace('.', '\\.')} \\|`, 'g')) ?? []).length;
  if (count !== 1) errors.push(`OBJECTIVES.md: objective ${code} appears ${count} times`);
}

function numberedEntries(file) {
  const text = readFileSync(join(root, file), 'utf8');
  return [...text.matchAll(/^(\d+)\. /gm)].map((match) => Number(match[1]));
}

for (const file of ['practice/questions.md', 'practice/answers.md']) {
  const numbers = numberedEntries(file);
  const expected = Array.from({ length: 200 }, (_, index) => index + 1);
  if (numbers.length !== expected.length || numbers.some((number, index) => number !== expected[index])) {
    errors.push(`${file}: expected one ordered entry for every number 1..200`);
  }
}

for (const file of ['practice/subnetting.md', 'practice/subnetting-answers.md']) {
  const numbers = numberedEntries(file);
  const unique = [...new Set(numbers.filter((number) => number <= 40))].sort((a, b) => a - b);
  if (unique.length !== 40 || unique.some((number, index) => number !== index + 1)) {
    errors.push(`${file}: expected entries 1..40`);
  }
}

const labs = readFileSync(join(root, 'labs/README.md'), 'utf8');
for (let number = 1; number <= 26; number += 1) {
  const id = String(number).padStart(2, '0');
  if (!labs.includes(`## Lab ${id} `)) errors.push(`labs/README.md: missing Lab ${id}`);
}

if (errors.length) {
  console.error(`Documentation checks failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Documentation checks passed: ${markdownFiles.length} Markdown files, 25 objectives, 200 questions, 26 labs.`);
