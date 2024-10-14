const fs = require('fs');
const path = require('path');

function addComponent(component) {
  const componentPath = path.join(process.cwd(), 'src', 'lib', 'components', `${component}.svelte`);
  const componentContent = `<p>${component} works</p>`;
  
  fs.mkdirSync(path.dirname(componentPath), { recursive: true });
  fs.writeFileSync(componentPath, componentContent);
  
  console.log(`Component ${component} created successfully.`);
}

module.exports = addComponent;

