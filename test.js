// Equation solver (uses Row Echelon Form)
const Matrix = require('./matrix.js');
const ref = require('./ref.js');

// Create a dependent system of equations
let m = new Matrix(3, 4);
m.setRow(0, [1, 0, 1, 1]);
m.setRow(1, [0, 0, 1, 2]);
m.setRow(2, [0, 1, 0, 3]);

console.log(m.toString());

// Put it in row echelon form
const m2 = ref(m);

console.log(m2.toString());