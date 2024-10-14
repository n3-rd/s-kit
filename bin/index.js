#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { Command } = require('commander');

const program = new Command();

program
  .name('s-kit')
  .description('CLI to add SvelteKit routes, components, and other file types')
  .version('1.0.0');

program.command('add')
  .argument('<component>', 'component name')
  .description('Add a new component')
  .action((component) => {
    const componentPath = path.join(process.cwd(), 'src', 'lib', 'components', `${component}.svelte`);
    const componentContent = `<p>${component} works</p>`;
    
    fs.mkdirSync(path.dirname(componentPath), { recursive: true });
    fs.writeFileSync(componentPath, componentContent);
    
    console.log(`Component ${component} created successfully.`);
  });

program.command('route')
  .command('add')
  .argument('<route>', 'route name')
  .option('--no-server', 'Skip creating server file')
  .description('Add a new route')
  .action((route, options) => {
    // Parse the route to handle groups
    const routeParts = route.split('/');
    const groupName = routeParts[0].startsWith('(') ? routeParts.shift() : null;
    const routeName = routeParts.join('/');

    let routePath = path.join(process.cwd(), 'src', 'routes');
    if (groupName) {
      routePath = path.join(routePath, groupName);
    }
    routePath = path.join(routePath, routeName);

    const pagePath = path.join(routePath, '+page.svelte');
    const pageContent = `<h1>${routeName} page</h1>`;
    
    fs.mkdirSync(routePath, { recursive: true });
    fs.writeFileSync(pagePath, pageContent);
    
    if (options.server) {
      const serverPath = path.join(routePath, '+page.server.ts');
      const serverContent = `export function load() {\n  return {\n    // Add your server-side logic here\n  };\n}`;
      fs.writeFileSync(serverPath, serverContent);
    } else {
      const clientPath = path.join(routePath, '+page.ts');
      const clientContent = `export function load() {\n  return {\n    // Add your client-side logic here\n  };\n}`;
      fs.writeFileSync(clientPath, clientContent);
    }
    
    console.log(`Route ${route} created successfully.`);
  });

program.command('layout')
  .argument('<name>', 'layout name')
  .description('Add a new layout')
  .action((name) => {
    const layoutPath = path.join(process.cwd(), 'src', 'routes', name, '+layout.svelte');
    const layoutContent = `
<script>
  import '../app.css';
</script>

<slot />
    `.trim();
    
    fs.mkdirSync(path.dirname(layoutPath), { recursive: true });
    fs.writeFileSync(layoutPath, layoutContent);
    
    console.log(`Layout ${name} created successfully.`);
  });

program.command('error')
  .argument('<name>', 'error page name')
  .description('Add a new error page')
  .action((name) => {
    const errorPath = path.join(process.cwd(), 'src', 'routes', name, '+error.svelte');
    const errorContent = `
<script>
  import { page } from '$app/stores';
</script>

<h1>{$page.status}: {$page.error.message}</h1>
    `.trim();
    
    fs.mkdirSync(path.dirname(errorPath), { recursive: true });
    fs.writeFileSync(errorPath, errorContent);
    
    console.log(`Error page ${name} created successfully.`);
  });

program.command('server')
  .argument('<name>', 'server route name')
  .description('Add a new server route')
  .action((name) => {
    const serverPath = path.join(process.cwd(), 'src', 'routes', name, '+server.ts');
    const serverContent = `
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  // Add your server-side logic here
  return json({
    message: 'Hello from the server!'
  });
};
    `.trim();
    
    fs.mkdirSync(path.dirname(serverPath), { recursive: true });
    fs.writeFileSync(serverPath, serverContent);
    
    console.log(`Server route ${name} created successfully.`);
  });

program.command('store')
  .argument('<name>', 'store name')
  .description('Add a new store')
  .action((name) => {
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
  });

program.parse(process.argv);
