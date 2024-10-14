const fs = require('fs');
const path = require('path');

function addServer(name) {
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
}

module.exports = addServer;

