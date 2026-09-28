import { cp, mkdir, rm, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const out = new URL('../www/', import.meta.url);
const rootIndex = new URL('../index.html', import.meta.url);
const rootImages = new URL('../images/', import.meta.url);

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

await cp(rootIndex, new URL('index.html', out));

if (existsSync(rootImages)) {
  await cp(rootImages, new URL('images/', out), { recursive: true });
}

const info = await stat(new URL('index.html', out));
console.log(`Relativity Explorer web package prepared (${info.size} byte index.html).`);
