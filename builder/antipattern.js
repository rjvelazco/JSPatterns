// const HTMLChunk 
const hello = "hello";
let html = [];

html.push('<p>');
html.push(hello);
html.push('</p>');

console.log(html.join(''));

const words = ['hello', 'world'];

html = [];
html.push('<ul>\n');
words.forEach(word => {
  html.push(`  <li>${word}</li>\n`);
});
html.push('</ul>');

console.log(html.join(''));