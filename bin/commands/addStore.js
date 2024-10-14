const fs = require('fs');
const path = require('path');

function addStore(name) {
  const extension = path.extname(name) || '.js';
  const storeName = path.basename(name, extension);
  const storePath = path.join(process.cwd(), 'src', 'lib', 'stores', `${storeName}${extension}`);
  
  const storeContent = `import { writable } from 'svelte/store';

export const ${storeName} = writable(0);

export function increment() {
  ${storeName}.update(n => n + 1);
}

export function decrement() {
  ${storeName}.update(n => n - 1);
}

export function reset() {
  ${storeName}.set(0);
}`;
  
  fs.mkdirSync(path.dirname(storePath), { recursive: true });
  fs.writeFileSync(storePath, storeContent);
  
  console.log(`Store ${storeName} created successfully at ${storePath}`);
}

module.exports = addStore;

