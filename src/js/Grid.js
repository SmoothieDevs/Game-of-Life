class Grid {
    generation = 0;
    //constructor
    constructor(rows, cols, cellSize) {
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
        this.grid = this.buildGrid();
    }
    //build grid
    buildGrid() {
        var grid = [];
        for (var row = 0; row < this.rows; row++) {
            grid.push([]);
            for (var col = 0; col < this.cols; col++) {
                grid[row].push(0);
            }
        }
        return grid;
    }
    //draw grid lines without blur
    drawGridLines(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 0.15;
        for (var row = 0; row < this.rows; row++) {
            ctx.moveTo(0, row * this.cellSize);
            ctx.lineTo(this.cols * this.cellSize, row * this.cellSize);
        }
        for (var col = 0; col < this.cols; col++) {
            ctx.moveTo(col * this.cellSize, 0);
            ctx.lineTo(col * this.cellSize, this.rows * this.cellSize);
        }
        ctx.stroke();
    }
    //draw grid
    drawGrid(ctx) {
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.cols; col++) {
                if (this.grid[row][col] === 1) {
                    ctx.fillStyle = "#000000";
                } else {
                    ctx.fillStyle = "#FFFFFF";
                }
                ctx.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
            }
        }
    }
    //get cell
    getCell(row, col) {
        return this.grid[row][col];
    }
    //set cell
    setCell(row, col, val) {
        this.grid[row][col] = val;
    }
    //get neighbors
    getNeighbors(row, col) {
        var neighbors = [];
        if (row > 0) {
            neighbors.push([row - 1, col]);
        }
        if (row < this.rows - 1) {
            neighbors.push([row + 1, col]);
        }
        if (col > 0) {
            neighbors.push([row, col - 1]);
        }
        if (col < this.cols - 1) {
            neighbors.push([row, col + 1]);
        }
        if (row > 0 && col > 0) {
            neighbors.push([row - 1, col - 1]);
        }
        if (row > 0 && col < this.cols - 1) {
            neighbors.push([row - 1, col + 1]);
        }
        if (row < this.rows - 1 && col > 0) {
            neighbors.push([row + 1, col - 1]);
        }
        if (row < this.rows - 1 && col < this.cols - 1) {
            neighbors.push([row + 1, col + 1]);
        }
        return neighbors;
    }
    //random
    random() {
        var grid = [];
        for (var row = 0; row < this.rows; row++) {
            grid.push([]);
            for (var col = 0; col < this.cols; col++) {
                //random between 0 and 1
                grid[row].push(Math.floor(Math.random() * 2));
            }
        }
        return grid;
    }
}