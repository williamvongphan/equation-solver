// Matrix class for Row Echelon Form
class Matrix {
	constructor(rows, cols) {
		this.rows = rows;
		this.cols = cols;
		this.data = [];
		for (let i = 0; i < this.rows; i++) {
			this.data[i] = [];
			for (let j = 0; j < this.cols; j++) {
				this.data[i][j] = 0;
			}
		}
	}

	static fromArray(arr) {
		let m = new Matrix(arr.length, 1);
		for (let i = 0; i < arr.length; i++) {
			m.data[i][0] = arr[i];
		}
		return m;
	}

	toArray() {
		let arr = [];
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				arr.push(this.data[i][j]);
			}
		}
		return arr;
	}

	randomize() {
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				this.data[i][j] = Math.floor(Math.random() * 10);
			}
		}
	}

	add(n) {
		if (n instanceof Matrix) {
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					this.data[i][j] += n.data[i][j];
				}
			}
		} else {
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					this.data[i][j] += n;
				}
			}
		}
	}

	static subtract(a, b) {
		let result = new Matrix(a.rows, a.cols);
		for (let i = 0; i < result.rows; i++) {
			for (let j = 0; j < result.cols; j++) {
				result.data[i][j] = a.data[i][j] - b.data[i][j];
			}
		}
		return result;
	}

	static multiply(a, b) {
		if (a.cols !== b.rows) {
			console.log('Columns of A must match rows of B.');
			return undefined;
		}
		let result = new Matrix(a.rows, b.cols);
		for (let i = 0; i < result.rows; i++) {
			for (let j = 0; j < result.cols; j++) {
				let sum = 0;
				for (let k = 0; k < a.cols; k++) {
					sum += a.data[i][k] * b.data[k][j];
				}
				result.data[i][j] = sum;
			}
		}
		return result;
	}

	static transpose(matrix) {
		let result = new Matrix(matrix.cols, matrix.rows);
		for (let i = 0; i < matrix.rows; i++) {
			for (let j = 0; j < matrix.cols; j++) {
				result.data[j][i] = matrix.data[i][j];
			}
		}
		return result;
	}

	static map(matrix, func) {
		let result = new Matrix(matrix.rows, matrix.cols);
		for (let i = 0; i < matrix.rows; i++) {
			for (let j = 0; j < matrix.cols; j++) {
				let val = matrix.data[i][j];
				result.data[i][j] = func(val);
			}
		}
		return result;
	}

	static map2(a, b, func) {
		let result = new Matrix(a.rows, a.cols);
		for (let i = 0; i < a.rows; i++) {
			for (let j = 0; j < a.cols; j++) {
				let x = a.data[i][j];
				let y = b.data[i][j];
				result.data[i][j] = func(x, y);
			}
		}
		return result;
	}

	print() {
		console.table(this.data);
	}

	serialize() {
		return JSON.stringify(this);
	}

	static deserialize(data) {
		if (typeof data == 'string') {
			data = JSON.parse(data);
		}
		let matrix = new Matrix(data.rows, data.cols);
		matrix.data = data.data;
		return matrix;
	}

	copy() {
		let matrix = new Matrix(this.rows, this.cols);
		matrix.data = this.data;
		return matrix;
	}

	static fromArray(arr) {
		return new Matrix(arr.length, 1, arr);
	}

	toArray() {
		let arr = [];
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				arr.push(this.data[i][j]);
			}
		}
		return arr;
	}

	toString() {
		let str = '';
		for (let i = 0; i < this.rows; i++) {
			let row;
			if (this.rows === 1) {
				row = "["
			} else if (i === 0) {
				row = '┌';
			} else if (i === this.rows - 1) {
				row = '└';
			} else {
				row = '│';
			}
			for (let j = 0; j < this.cols; j++) {
				row += this.data[i][j];
				if (j < this.cols - 1) {
					row += ' ';
				}
			}
			if (this.rows === 1) {
				row += ']';
			} else if (i === 0) {
				row += '┐';
			} else if (i === this.rows - 1) {
				row += '┘';
			} else {
				row += '│';
			}
			str += row;
			if (i < this.rows - 1) {
				str += '\n';
			}
		}
		return str;
	}

	get(x, y) {
		return this.data[x][y];
	}

	set(x, y, value) {
		this.data[x][y] = value;
	}

	setRow(row, arr) {
		this.data[row] = arr;
	}

	setCol(col, arr) {
		for (let i = 0; i < this.rows; i++) {
			this.data[i][col] = arr[i];
		}
	}

	getRow(row) {
		return this.data[row];
	}

	getCol(col) {
		let arr = [];
		for (let i = 0; i < this.rows; i++) {
			arr.push(this.data[i][col]);
		}
		return arr;
	}

	setAll(value) {
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				this.data[i][j] = value;
			}
		}
	}

	randomize() {
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				this.data[i][j] = Math.random() * 2 - 1;
			}
		}
	}
}



module.exports = Matrix;