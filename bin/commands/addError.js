const fs = require('fs');
const path = require('path');

function addError(route) {
  const errorPath = path.join(process.cwd(), 'src', 'routes', route, '+error.svelte');
  const errorContent = `
<script>
  import { page } from '$app/stores';
</script>

<h1>{$page.status}: {$page.error.message}</h1>
  `.trim();
  
  fs.mkdirSync(path.dirname(errorPath), { recursive: true });
  fs.writeFileSync(errorPath, errorContent);
  
  console.log(`Error page created successfully at ${errorPath}`);
}

module.exports = addError;
