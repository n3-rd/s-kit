const fs = require('fs');
const path = require('path');

function addLayout(route) {
  const layoutPath = path.join(process.cwd(), 'src', 'routes', route, '+layout.svelte');
  const layoutContent = `
<script>
  import '../app.css';
</script>

<slot />
  `.trim();
  
  fs.mkdirSync(path.dirname(layoutPath), { recursive: true });
  fs.writeFileSync(layoutPath, layoutContent);
  
  console.log(`Layout created successfully at ${layoutPath}`);
}

module.exports = addLayout;
