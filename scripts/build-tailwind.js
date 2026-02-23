const fs = require('fs');
const postcss = require('postcss');
const tailwindPostcss = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');

const input = fs.readFileSync('global.css', 'utf8');

postcss([tailwindPostcss(), autoprefixer])
  .process(input, { from: 'global.css', to: 'output.css' })
  .then(result => {
    fs.writeFileSync('output.css', result.css);
    console.log('Wrote output.css, length:', result.css.length);
  })
  .catch(err => {
    console.error('PostCSS error:', err);
    process.exit(1);
  });
