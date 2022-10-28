const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

let diagonal1 = 0;
let diagonal2 = 0;

for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j <= matrix.length; j++) {

    // Calculate diagonal 1
    if (i == j) {
      diagonal1 += matrix[i][j];
    }

    // Calculate diagonal 2
    if (i + j == matrix[i].length - 1) {
      diagonal2 += matrix[i][j];
    }
    
  }
}

console.log(`Total diagonal 1 = ${diagonal1}`);
console.log(`Total diagonal 2 = ${diagonal2}`);

console.log(
  `Hasil dari ${diagonal1} - ${diagonal2} = ${diagonal1 - diagonal2}`
);
