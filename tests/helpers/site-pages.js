import { readdir } from 'node:fs/promises';
import { join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const ignoredDirectories = new Set(['node_modules', 'playwright-report', 'test-results']);

async function findHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.') || ignoredDirectories.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await findHtmlFiles(path));
    if (entry.isFile() && entry.name.endsWith('.html')) files.push(path);
  }

  return files;
}

export async function sitePages() {
  const files = await findHtmlFiles(root);
  return files
    .map(file => {
      const path = relative(root, file).split(sep).join('/');
      return path === 'index.html' ? '/' : `/${path}`;
    })
    .sort();
}

