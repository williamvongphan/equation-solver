# Reduced Row Echelon Form (RREF) of a matrix
from matrix import Matrix

def swap_rows(M, i, j):
    """Swap rows i and j of M"""
    M[i], M[j] = M[j], M[i]

def multiply_row(M, i, k):
    """Multiply row i of M by k"""
    M[i] = [k * x for x in M[i]]

def add_rows(M, i, j, k):
    """Add k times row j to row i of M"""
    M[i] = [x + k * y for x, y in zip(M[i], M[j])]

def rref(M):
    """Return the Reduced Row Echelon Form of M"""
    M = M.copy()
    lead = 0
    for r in range(len(M)):
        if len(M[0]) <= lead:
            return M
        i = r
        while M[i][lead] == 0:
            i += 1
            if len(M) == i:
                i = r
                lead += 1
                if len(M[0]) == lead:
                    return M
        swap_rows(M, i, r)
        multiply_row(M, r, 1 / M[r][lead])
        for i in range(len(M)):
            if i != r:
                add_rows(M, i, r, -M[i][lead])
        lead += 1
    return M

def main():
    M = Matrix(3, 3)
    M.setData([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
    print(rref(M))

if __name__ == '__main__':
    main()
