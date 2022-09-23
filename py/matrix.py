# Matrix class in Python
epsilon = 1e-6
def correct_float_error(f):
    # Takes a float and rounds to integer if it is close enough
    if abs(f - round(f)) < epsilon:
        return round(f)
    else:
        return f

class Matrix:
    def __init__(self, rows, cols):
        self.rows = rows
        self.cols = cols
        self.data = [[0 for i in range(cols)] for j in range(rows)]

    def __add__(self, other):
        if self.rows != other.rows or self.cols != other.cols:
            raise Exception("Matrices must have the same dimensions")
        result = Matrix(self.rows, self.cols)
        for i in range(self.rows):
            for j in range(self.cols):
                result.data[i][j] = self.data[i][j] + other.data[i][j]
        return result

    def __sub__(self, other):
        if self.rows != other.rows or self.cols != other.cols:
            raise Exception("Matrices must have the same dimensions")
        result = Matrix(self.rows, self.cols)
        for i in range(self.rows):
            for j in range(self.cols):
                result.data[i][j] = self.data[i][j] - other.data[i][j]
        return result

    def __mul__(self, other):
        if self.cols != other.rows:
            raise Exception("Matrices must have the same dimensions")
        result = Matrix(self.rows, other.cols)
        for i in range(self.rows):
            for j in range(other.cols):
                for k in range(self.cols):
                    result.data[i][j] += self.data[i][k] * other.data[k][j]
        return result

    def __truediv__(self, other):
        if self.rows != other.rows or self.cols != other.cols:
            raise Exception("Matrices must have the same dimensions")
        result = Matrix(self.rows, self.cols)
        for i in range(self.rows):
            for j in range(self.cols):
                result.data[i][j] = self.data[i][j] / other.data[i][j]
        return result

    def __pow__(self, other):
        if self.rows != self.cols:
            raise Exception("Matrix must be square")
        result = Matrix(self.rows, self.cols)
        for i in range(self.rows):
            for j in range(self.cols):
                result.data[i][j] = self.data[i][j] ** other
        return result

    def __mod__(self, other):
        if self.rows != self.cols:
            raise Exception("Matrix must be square")
        result = Matrix(self.rows, self.cols)
        for i in range(self.rows):
            for j in range(self.cols):
                result.data[i][j] = self.data[i][j] % other
        return result

    def __eq__(self, other):
        if self.rows != other.rows or self.cols != other.cols:
            return False
        for i in range(self.rows):
            for j in range(self.cols):
                if self.data[i][j] != other.data[i][j]:
                    return False
        return True

    def __ne__(self, other):
        return not self == other

    def __getitem__(self, key):
        return self.data[key]

    def __setitem__(self, key, value):
        self.data[key] = value

    def __len__(self):
        return self.rows

    def __iter__(self):
        return iter(self.data)

    def get(self, row, col):
        return self.data[row][col]

    def set(self, row, col, value):
        self.data[row][col] = value

    def transpose(self):
        result = Matrix(self.cols, self.rows)
        for i in range(self.rows):
            for j in range(self.cols):
                result.data[j][i] = self.data[i][j]
        return result

    def map(self, func):
        for i in range(self.rows):
            for j in range(self.cols):
                self.data[i][j] = func(self.data[i][j])

    def copy(self):
        result = Matrix(self.rows, self.cols)
        for i in range(self.rows):
            for j in range(self.cols):
                result.data[i][j] = self.data[i][j]
        return result

    def randomize(self):
        import random
        for i in range(self.rows):
            for j in range(self.cols):
                self.data[i][j] = random.random()

    def print(self):
        # Create a lines list with num columns + 2 slots
        lines = ["" for i in range(self.cols + 2)]
        lines[0] = "┌\t"
        for i in range(self.cols):
            lines[0] += "\t"
        lines[0] += "┐"
        for i in range(self.rows):
            lines[i+1] = "│"
            for j in range(self.cols):
                lines[i+1] += "\t" + str(correct_float_error(self.data[i][j]))
            lines[i+1] += "\t│"
        lines[self.rows+1] = "└\t"
        for i in range(self.cols):
            lines[self.rows+1] += "\t"
        lines[self.rows+1] += "┘"
        return "\n".join(lines)

    def setData(self, data):
        self.data = data

    def __str__(self):
        return self.print()

    def __repr__(self):
        return self.print()
