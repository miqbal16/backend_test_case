const sentence = 'Saya sangat senang mengerjakan soal algoritma';

const splitSetence = sentence.split(' ');

let lenStr = 0;
let longestStr = '';

for (let i = 0; i < splitSetence.length; i++) {
  if (splitSetence[i].length > lenStr) {
    lenStr = splitSetence[i].length;
    longestStr = splitSetence[i];
  }
}

console.log(`${longestStr}: ${lenStr} character`);
