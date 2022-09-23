// Equation solver (uses Row Echelon Form)
const Matrix = require('./matrix.js');
const ref = require('./ref.js');
const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let mathRoundingErrorAccuracyDigits = 7;

const prompt = async (question) => {
	return new Promise((resolve, reject) => {
		rl.question(question, (answer) => {
			resolve(answer);
		});
	});
};

const fixFloatError = (number) => {
	return Math.round(number * (10 ** mathRoundingErrorAccuracyDigits)) / (10 ** mathRoundingErrorAccuracyDigits);
}

function parseMathExpression (string, variableCount) {
	// Given a math expression containing numbers, variables, and "+" or "-" operators, return an array of numbers representing the coefficients of the variables.
	// Example: "2x + 3y - 4z" -> [2, 3, -4]
	let result = [];
	let currentNumber = '';
	let variablesCovered = 0;
	// Note: the expression may not contain a variable (e.g. "2x - 3z") so we need to make sure to account for that (variables array should help)
	let currentVariable = '';
	let currentSign = 1;
	for (let i = 0; i < string.length; i++) {
		let char = string[i];
		if (char === '+' || char === '-') {
			if (currentNumber.length > 0) {
				result.push(currentSign * parseInt(currentNumber));
				currentNumber = '';
			}
			currentSign = char === '+' ? 1 : -1;
		} else if (variables.includes(char)) {
			// Make sure that we're not skipping any variables (if it's like "2x + 3z" and we're on the "z" then we need to add a 0 for the "y" variable)
			while (variables[variablesCovered] !== char && variablesCovered < variableCount) {
				result.push(0);
				variablesCovered++;
			}
			if (currentNumber.length > 0) {
				result.push(currentSign * parseInt(currentNumber));
				currentNumber = '';
			} else {
				result.push(currentSign);
			}
			variablesCovered++;
		} else if (char === ' ') {
			continue;
		} else {
			currentNumber += char;
		}
	}
	if (currentNumber.length > 0) {
		result.push(currentSign * parseInt(currentNumber));
	}
	while (variablesCovered < variableCount) {
		result.push(0);
		variablesCovered++;
	}
	return result;
}


let variables = ["x", "y", "z", "w", "a", "b", "c"];

(async () => {
	// Get number of equations
	let numEquations = await prompt('How many equations would you like to solve? ');
	if (isNaN(numEquations)) {
		console.log('Please enter a number.');
		process.exit();
	}
	// Get number of variables
	let numVariables = await prompt('How many variables are there? ');
	if (isNaN(numVariables)) {
		console.log('Please enter a number.');
		process.exit();
	}
	// Create matrix
	// Now we'll get each equation
	let matrix = new Matrix(numEquations, numVariables + 1);
	for (let i = 0; i < numEquations; i++) {
		// Get equation line
		let equation = await prompt(`Enter equation ${i + 1}: `);
		// Split equation into terms
		equation = equation.replace(/ /g, '').split("=");
		// Get left side of equation
		let leftSide = equation[0];
		// Get right side of equation
		let rightSide = parseInt(equation[1]);
		// Check if right side is a number
		if (isNaN(rightSide)) {
			console.log('Please enter a valid equation. (Equation constant value is not a number)');
			process.exit();
		}
		// Parse left side of equation
		let leftSideParsed = parseMathExpression(leftSide, numVariables);
		// Check if left side is valid
		if (leftSideParsed.length > numVariables) {
			console.log('Please enter a valid equation. (Equation contains too many variables)');
			process.exit();
		}

		// Add left side to matrix
		for (let j = 0; j < leftSideParsed.length; j++) {
			matrix.set(i, j, leftSideParsed[j]);
		}

		// Add right side to matrix
		matrix.set(i, numVariables, rightSide);
	}

	// Solve matrix
	let solution = ref(matrix);

	// Print solution
	console.log('Solution:');
	for (let i = 0; i < solution.rows; i++) {
		console.log(`${variables[i]} = ${fixFloatError(parseFloat(solution.data[i][numVariables]))}`);
	}

	process.exit();
})();