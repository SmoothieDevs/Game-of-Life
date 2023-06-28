//get the canvas and setup grid into canvas
var canvas = document.getElementById("canvas");
var cellSize = 15;
//set canvas width and height, width = window width, height = parent height
canvas.width = Math.floor(window.innerWidth / cellSize) * cellSize;
canvas.height = Math.floor(canvas.parentNode.clientHeight / cellSize) * cellSize
var ctx = canvas.getContext("2d");


var isRunning = false;
var interval;
var speed = 100;
var generationElement = document.getElementById("generation");
var speedElement = document.getElementById("speed");
var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");
var resetButton = document.getElementById("reset");
var randomButton = document.getElementById("random");
var speedUpButton = document.getElementById("speedUp");
var speedDownButton = document.getElementById("speedDown");
var grid = new Grid(canvas.height / cellSize, canvas.width / cellSize, cellSize);
var life = new Life(grid, generationElement);

function init() {
  grid.drawGrid(ctx);
  grid.drawGridLines(ctx);
  canvas.addEventListener("click", function (event) {
    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop;
    var row = Math.floor(y / grid.cellSize);
    var col = Math.floor(x / grid.cellSize);
    if (grid.getCell(row, col) === 1) {
      grid.setCell(row, col, 0);
    } else {
      grid.setCell(row, col, 1);
    }
    grid.drawGrid(ctx);
    grid.drawGridLines(ctx);
  });
  generationElement.innerHTML = "Génération : " + grid.generation;
  updateSpeed();
  startButton.addEventListener("click", start);
  resetButton.addEventListener("click", clear);
  randomButton.addEventListener("click", random);
  speedUpButton.addEventListener("click", speedUp);
  speedDownButton.addEventListener("click", speedDown);
}

function speedDown() {
  if (speed > 10) {
    speed -= 50;
    updateSpeed();
    clearInterval(interval);
    interval = setInterval(life.run, speed);
  }
}

function updateSpeed() {
  // affiche la vitesse en pourcentage, 1000 = 0% et 10 = 100%
  speedElement.innerHTML = "Speed : " + Math.floor((1000 - speed) / 10) + "%";
}

function speedUp() {
  if (speed < 1000) {
    speed += 50;
    updateSpeed();
    clearInterval(interval);
    interval = setInterval(life.run, speed);
  }
}

function start() {
  if (!isRunning) {
    isRunning = true;
    interval = setInterval(life.run, speed);
    startButton.innerHTML = "Pause";
  } else {
    isRunning = false;
    clearInterval(interval);
    startButton.innerHTML = "Continue";
  }
}

function pause() {
  isRunning = false;
  clearInterval(interval);
}

function clear() {
  pause();
  startButton.innerHTML = "Start";
  grid.generation = 0;
  generationElement.innerHTML = "Génération : " + grid.generation;
  grid.grid = grid.buildGrid();
  grid.drawGrid(ctx);
  grid.drawGridLines(ctx);
}

function random() {
  grid.grid = grid.random();
  grid.drawGrid(ctx);
  grid.drawGridLines(ctx);
}

window.onload = init;