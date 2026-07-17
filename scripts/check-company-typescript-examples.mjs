#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const references = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'skills',
  'angular-developer',
  'references',
);
const errors = [];

for (const file of await fs.readdir(references)) {
  if (!file.endsWith('.md')) continue;

  const markdown = await fs.readFile(path.join(references, file), 'utf8');
  const blocks = markdown.matchAll(/```(?:ts|typescript)\n([\s\S]*?)```/g);

  for (const [, code] of blocks) {
    if (/\bvar\s+/.test(code)) errors.push(`${file}: uses var`);
    if (/(?:[:<]|\bas\s+)\s*any\b|:\s*object\b/.test(code)) {
      errors.push(`${file}: uses any or object`);
    }
    if (/console\.(?:log|warn)\(/.test(code)) errors.push(`${file}: uses console.log/warn`);

    let classDepth = 0;
    for (const line of code.split('\n')) {
      if (!classDepth && /\bclass\s+\w+[^\n]*\{/.test(line)) {
        classDepth = braces(line);
        continue;
      }
      if (!classDepth) continue;

      if (
        classDepth === 1 &&
        /^  (?!public\b|private\b|protected\b|static\b|\/|\*|@|$)[A-Za-z_$][\w$]*/.test(line)
      ) {
        errors.push(`${file}: class member lacks an access modifier: ${line.trim()}`);
      }

      if (
        classDepth === 1 &&
        /^  (?:public|private|protected)\s+(?!constructor\b)(?:async\s+)?[A-Za-z_$][\w$]*\([^)]*\)\s*\{/.test(
          line,
        )
      ) {
        errors.push(`${file}: method lacks an explicit return type: ${line.trim()}`);
      }

      classDepth += braces(line);
      if (classDepth < 0) classDepth = 0;
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('Company TypeScript example checks passed.');

function braces(line) {
  return [...line].reduce(
    (depth, character) => depth + (character === '{' ? 1 : character === '}' ? -1 : 0),
    0,
  );
}
