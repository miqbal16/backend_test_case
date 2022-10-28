const text = 'NEGIE1';
let newText = '';
let charText = '';
const numStr = text[text.length - 1];

for (let i = 0; i < text.length - 1; i++) {
  charText = text[i];
  newText = charText + newText;

  if (i === text.length - 2) {
    newText += numStr;
  }
}
console.log(newText);
