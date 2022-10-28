INPUT = ['xc', 'dz', 'bbb', 'dz'];
QUERY = ['bbb', 'ac', 'dz'];

const OUTPUT = [];

for (let i = 0; i < QUERY.length; i++) {
  let count = 0;
  const dataQuery = QUERY[i];
  for (let j = 0; j < INPUT.length; j++) {
    if (dataQuery === INPUT[j]) {
      count += 1;
    }
  }
  OUTPUT.push(count);
}

console.log(OUTPUT);
