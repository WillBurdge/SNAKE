const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// game variables
const gridSize = 10;
let direction = "right";
let snake = [{ x: 10, y: 10 }];
let food = { x: 0, y: 0 };
let score = 0;
let gameIntervalId;

// random food location
function createFood() {
  food.x = Math.floor(Math.random() * canvas.width / gridSize) * gridSize;
  food.y = Math.floor(Math.random() * canvas.height / gridSize) * gridSize;
}

// keyboard input
document.addEventListener("keydown", function (event) {
  if (event.keyCode === 37 && direction !== "right") {
    direction = "left";
  } else if (event.keyCode === 38 && direction !== "down") {
    direction = "up";
  } else if (event.keyCode === 39 && direction !== "left") {
    direction = "right";
  } else if (event.keyCode === 40 && direction !== "up") {
    direction = "down";
  }
});

// draw snake and food
function draw() {
  // move snake
  let head = { x: snake[0].x, y: snake[0].y };
  if (direction === "left") {
    head.x -= gridSize;
  } else if (direction === "up") {
    head.y -= gridSize;
  } else if (direction === "right") {
    head.x += gridSize;
  } else if (direction === "down") {
    head.y += gridSize;
  }
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    createFood();
    score += 10;
  } else {
    snake.pop();
  }

  // clear canvas, draw snake and food
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "green";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);
  }
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);

  // update score
  document.getElementById("score").innerHTML = "Score: " + score;
}

function startGame() {
  if (!gameIntervalId) {
    gameIntervalId = setInterval(draw, 100);
  }
}

function pauseGame() {
  clearInterval(gameIntervalId);
  gameIntervalId = null;
}

function restartGame() {
  startGame();
  snake = [{ x: 10, y: 10 }];
  direction = "right";
  score = 0;
  createFood();
  draw();
}

document.getElementById("startPauseButton").addEventListener("click", function () {
  if (!gameIntervalId) {
    startGame();
    this.innerHTML = "Pause";
  } else {
    pauseGame();
    this.innerHTML = "Start";
  }
});

document.getElementById("restartButton").addEventListener("click", function () {
  restartGame();
  document.getElementById("startPauseButton").innerHTML = "Start";
});

// start game
createFood();
draw();
