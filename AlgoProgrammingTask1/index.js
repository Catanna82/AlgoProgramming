function matrix(data) {
    const findFigure = ({ symbol, width, height, column, row }) => {
        if (row + height > rows || column + width > columns) {
            return false;
        }
        for (let r = row; r < height + row; r++) {
            for (let c = column; c < width + column; c++) {
                if (matrixBoard[r][c] !== symbol) {
                    return false;
                }

            }
        }
        return true;
    };
    const matrixBoard = [
        [3, 3, 7, 7, 7, 7, 6, 6, 7, 7],
        [3, 3, 7, 7, 4, 4, 4, 4, 6, 3],
        [3, 3, 2, 7, 2, 2, 1, 1, 4, 3],
        [8, 2, 5, 5, 2, 1, 1, 3, 4, 3],
        [8, 9, 5, 1, 1, 1, 3, 3, 4, 3],
        [9, 2, 8, 9, 1, 1, 2, 2, 2, 7],
        [8, 1, 9, 1, 1, 9, 2, 5, 5, 4],
        [9, 8, 2, 8, 1, 1, 9, 8, 4, 7]
    ];
    const rows = matrixBoard.length;
    const columns = matrixBoard[0].length;

    for (let index = 0; index < data.length; index++) {

        const symbol = data[index].symbol;
        const width = data[index].width;
        const height = data[index].height;

        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                const isFound = findFigure({ symbol, width, height, column, row });
                if (isFound) {
                    const result = `Found figure: symbol = ${symbol}, position = (${row}, ${column}), size = (${width}, ${height})`;
                    console.log(result)
                }
            }
        }
    }
}

matrix([
    { symbol: 1, width: 2, height: 2 },
    { symbol: 2, width: 1, height: 2 },
    { symbol: 3, width: 2, height: 3 },
    { symbol: 7, width: 3, height: 1 }
])