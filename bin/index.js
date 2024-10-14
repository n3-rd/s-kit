#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { Command } = require('commander');

const program = new Command();

program
  .name('s-kit')
  .description('CLI to add SvelteKit routes and components')
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
    const routePath = path.join(process.cwd(), 'src', 'routes', route);
    const pagePath = path.join(routePath, '+page.svelte');
    const pageContent = `<h1>${route} page</h1>`;
    
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

program.parse(process.argv);