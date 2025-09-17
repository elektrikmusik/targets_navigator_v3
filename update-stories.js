const fs = require('fs');
const path = '/Users/hafid/webapps/starter/src/components/charts/ChoroplethMap.stories.tsx';

let content = fs.readFileSync(path, 'utf8');

// Add unified component props to all story args
const storyRegex = /export const (\w+): Story = \{\s*args: \{([^}]+)\},/g;

content = content.replace(storyRegex, (match, storyName, args) => {
  // Check if the args already have the new props
  if (args.includes('mode:') || args.includes('fittingMode:') || args.includes('excludeAntarctica:')) {
    return match;
  }
  
  // Add the new props before the closing brace
  const newArgs = args.trim();
  const lastProp = newArgs.split('\n').pop().trim();
  const indent = lastProp.match(/^(\s*)/)[1];
  
  const newProps = `,
${indent}mode: 'canvas',
${indent}fittingMode: 'centered',
${indent}excludeAntarctica: true`;
  
  return match.replace(args, args + newProps);
});

fs.writeFileSync(path, content);
console.log('Updated ChoroplethMap stories with unified component props');
