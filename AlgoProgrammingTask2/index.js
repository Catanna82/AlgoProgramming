function matrix(data) {
    const findClusterIndex = (clusters, rowClusters) => {
        const rowClustersMinColumn = rowClusters[0].column;
        const rowClustersMaxColumn = rowClusters[rowClusters.length - 1].column;
        const rowClustersRow = rowClusters[0].row;
        return clusters.findIndex((e) => {
            return e.findIndex((v) => {
                return (v.column >= rowClustersMinColumn && v.column <= rowClustersMaxColumn && v.row === rowClustersRow -1);
            }) > -1;
        });

    };
    const findRowClusterIndex = (rowClusters, column, row) => {
        return rowClusters.findIndex((e) => {
            return e.findIndex((v) => {
                return (v.column === column - 1 && v.row === row);
            }) > -1;
        });
    };

    const rows = 8;
    const columns = 10;

    for (let symbol = 1; symbol < 10; symbol++) {
        const clusters = [];
        const rowClusters = [];
        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                let currentElement = data[row][column];
                if (currentElement === symbol) {
                    if (!rowClusters.length) {
                        rowClusters.push([{ column, row }]);
                    } else {
                        const rowClusterIndex = findRowClusterIndex(rowClusters, column, row);
                        if (rowClusterIndex > -1) {
                            rowClusters[rowClusterIndex].push({ column, row });
                        } else {
                            rowClusters.push([{ column, row }]);
                        }
                    }
                }
            }
        }
        clusters.push(rowClusters.shift());
        for (let i = 0; i < rowClusters.length; i++) {
            const clusterIndex = findClusterIndex(clusters, rowClusters[i]);
            if (clusterIndex > -1) {
                clusters[clusterIndex] = clusters[clusterIndex].concat(rowClusters[i]);
            } else {
                clusters.push(rowClusters[i]);
            }
        }
        if (clusters.length) {
            clusters
                .filter(e => e.length > 1)
                .map((cluster) => {
                    const print = [
                        `Found cluster: symbol = ${symbol}`,
                        `size = ${cluster.length}`,
                        `positions = ${cluster.map(element => '(' + element.column + ', ' + element.row + ')').join(', ')}`
                    ].join(', ');
                    console.log(print);
                });
        }
    }
}

matrix([
    [3, 3, 7, 7, 7, 7, 6, 6, 7, 7],
    [3, 3, 7, 7, 4, 4, 4, 4, 6, 3],
    [3, 3, 2, 7, 2, 2, 1, 1, 4, 3],
    [8, 2, 5, 5, 2, 1, 1, 3, 4, 3],
    [8, 9, 5, 1, 1, 1, 3, 3, 4, 3],
    [9, 2, 8, 9, 1, 1, 2, 2, 2, 7],
    [8, 1, 9, 1, 1, 9, 2, 5, 5, 4],
    [9, 8, 2, 8, 1, 1, 9, 8, 4, 7]
])