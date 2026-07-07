const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'blocks', 'admin-puck-config.jsx');
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('createServiceDetailBlock')) {
  const factoryFunctions = `
const createServiceDetailBlock = (label, defaultProps) => ({
  label,
  fields: serviceDetailDarkFields,
  defaultProps,
  render: (props) => <HexServiceDetailDark {...props} />,
});

const createArticleDetailBlock = (label, defaultProps) => ({
  label,
  fields: articleDetailDarkFields,
  defaultProps,
  render: (props) => <HexArticleDetailDark {...props} />,
});
`;

  content = content.replace('// ─── Shared field sets', factoryFunctions + '\n// ─── Shared field sets');

  // Replace HexServiceDetailDark variants
  content = content.replace(/HexServiceDetailDark_?([a-zA-Z0-9_]*):\s*\{\s*label:\s*('[^']+'),\s*fields:\s*serviceDetailDarkFields,\s*defaultProps:\s*({[\s\S]*?^      \}),\s*render:\s*\(props\)\s*=>\s*<HexServiceDetailDark\s*\{\.\.\.props\}\s*\/>,\s*\}/gm, (match, p1, label, props) => {
    const name = p1 ? `HexServiceDetailDark_${p1}` : 'HexServiceDetailDark';
    return `${name}: createServiceDetailBlock(${label}, ${props})`;
  });

  // Replace HexArticleDetailDark variants
  content = content.replace(/HexArticleDetailDark_([a-zA-Z0-9_]+):\s*\{\s*label:\s*('[^']+'),\s*fields:\s*articleDetailDarkFields,\s*defaultProps:\s*({[\s\S]*?^      \}),\s*render:\s*\(props\)\s*=>\s*<HexArticleDetailDark\s*\{\.\.\.props\}\s*\/>,\s*\}/gm, (match, p1, label, props) => {
    return `HexArticleDetailDark_${p1}: createArticleDetailBlock(${label}, ${props})`;
  });

  fs.writeFileSync(filePath, content);
  console.log('Refactored admin-puck-config.jsx successfully.');
} else {
  console.log('Already refactored.');
}
