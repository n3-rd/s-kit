const fs = require('fs');
const path = require('path');

function addRoute(route, options) {
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
}

module.exports = addRoute;

