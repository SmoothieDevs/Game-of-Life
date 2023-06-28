class Life {
    constructor(grid, generationElement) {
        this.grid = grid;
        this.generationElement = generationElement;
    }
    //run
    run() {
        let nextGrid = this.grid.buildGrid();
        for (var row = 0; row < this.grid.rows; row++) {
            for (var col = 0; col < this.grid.cols; col++) {
                var cell = this.grid.getCell(row, col);
                var neighbors = this.grid.getNeighbors(row, col);
                var liveNeighbors = 0;
                for (var i = 0; i < neighbors.length; i++) {
                    var neighbor = neighbors[i];
                    if (this.grid.getCell(neighbor[0], neighbor[1]) === 1) {
                        liveNeighbors++;
                    }
                }
                if (cell === 1) {
                    if (liveNeighbors < 2) {
                        nextGrid[row][col] = 0;
                    } else if (liveNeighbors === 2 || liveNeighbors === 3) {
                        nextGrid[row][col] = 1;
                    } else {
                        nextGrid[row][col] = 0;
                    }
                } else {
                    if (liveNeighbors === 3) {
                        nextGrid[row][col] = 1;
                    } else {
                        nextGrid[row][col] = 0;
                    }
                }
            }
        }
        this.grid.generation++;
        this.generationElement.innerHTML = "Génération : "+ this.grid.generation;
        this.grid.grid = nextGrid;
        this.grid.drawGrid(ctx);
        this.grid.drawGridLines(ctx);
    }
}