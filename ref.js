// Row Echelon Form
const Matrix = require('./matrix.js');

function swapRows(m, i, j) {
    let temp = m.data[i];
    m.data[i] = m.data[j];
    m.data[j] = temp;
}

function multiplyRow(m, i, n) {
    for (let j = 0; j < m.cols; j++) {
        m.data[i][j] *= n;
    }
}

function addRows(m, i, j, n) {
    for (let k = 0; k < m.cols; k++) {
        m.data[i][k] += m.data[j][k] * n;
    }
}

function rowEchelonForm(m) {
    let lead = 0;
    for (let r = 0; r < m.rows; r++) {
        if (m.cols <= lead) {
            return;
        }
        let i = r;
        while (m.data[i][lead] === 0) {
            i++;
            if (m.rows === i) {
                i = r;
                lead++;
                if (m.cols === lead) {
                    return;
                }
            }
        }
        swapRows(m, i, r);
        multiplyRow(m, r, 1 / m.data[r][lead]);
        for (let j = 0; j < m.rows; j++) {
            if (j !== r) {
                addRows(m, j, r, -m.data[j][lead]);
            }
        }
        lead++;
    }

    return m;
}

module.exports = rowEchelonForm;