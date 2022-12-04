const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// we can update the screen using setTimeout and setInterval
//using settime out we can manupulate the screen how often we can update the screen

let speed = 7;
let tiltcount = 20; // on x and y axis 20 tiles
let headx = 10; // using x and y direction making the snake head on the middle
let heady = 10;
let tilesize = canvas.width / tiltcount - 2; // drwing snake inside of this tile a bit smaller
const snakeParts = [];
let tailLength = 2;
let score = 0;
let Xvelocity = 0;
let Yvelocity = 0;
let applex = 5;
let appley = 5;

class snakePart {
  constructor(x, y) {
    (this.x = x), (this.y = y);
  }
}

const gulpSound = new Audio("gulp.mp3");

// game loop
const drawGame = () => {
  changeSnakePosition();
  let result = gameOver();
  if (result === true) return;

  if (score > 5) {
    speed = 9;
  } else if (score > 10) {
    speed = 11;
  } else if (score > 15) {
    speed = 13;
  } else if (score > 20) {
    speed = 15;
  }

  clearScreen();
  checkAppleCollision();
  drawApple();
  drawSnake();
  drawScore();
  setTimeout(drawGame, 1000 / speed);
};

// clearscreen

const clearScreen = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

// draw sanke

const drawSnake = () => {
  ctx.fillStyle = "green";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tiltcount, part.y * tiltcount, tilesize, tilesize);
  }

  snakeParts.push(new snakePart(headx, heady));
  if (snakeParts.length > tailLength) {
    snakeParts.shift();
  }

  ctx.fillStyle = "orange";
  ctx.fillRect(headx * tiltcount, heady * tiltcount, tilesize, tilesize);
};

// change the snake position

const changeSnakePosition = () => {
  headx = headx + Xvelocity;
  heady = heady + Yvelocity;
};

// drawing apple

const drawApple = () => {
  ctx.fillStyle = "red";
  ctx.fillRect(applex * tiltcount, appley * tiltcount, tilesize, tilesize);
};

// check apple and snake collision

const checkAppleCollision = () => {
  if (applex === headx && appley === heady) {
    applex = Math.floor(Math.random() * tiltcount);
    appley = Math.floor(Math.random() * tiltcount);
    tailLength++;
    score++;
    gulpSound.play();
  }
};

// daraw score

const drawScore = () => {
  ctx.fillstyle = "white";
  ctx.font = "20px Verdana";
  ctx.fillText("Score " + score, canvas.width - 100, 30);
};

//game Over

const gameOver = () => {
  let gameIsOver = false;

  if (Xvelocity === 0 && Yvelocity === 0) {
    return;
  }

  if (headx < 0) {
    gameIsOver = true;
  } else if (headx === tiltcount) {
    gameIsOver = true;
  } else if (heady < 0) {
    gameIsOver = true;
  } else if (heady === tiltcount) {
    gameIsOver = true;
  }

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headx && part.y === heady) {
      gameIsOver = true;
      break;
    }
  }

  if (gameIsOver) {
    ctx.fillStyle = "white";
    ctx.font = "40px Verdana";
    ctx.fillText(" Game is over!", canvas.width / 6, canvas.height / 2);
  }
  return gameIsOver;
};

const keyDown = (event) => {
  //up
  if (event.keyCode === 38) {
    if (Yvelocity == 1) return;
    Yvelocity = -1;
    Xvelocity = 0;
    //down
  } else if (event.keyCode === 40) {
    if (Yvelocity == -1) return;
    Yvelocity = 1;
    Xvelocity = 0;
    //left
  } else if (event.keyCode === 37) {
    if (Xvelocity == 1) return;
    Yvelocity = 0;
    Xvelocity = -1;
    //right
  } else if (event.keyCode === 39) {
    if (Xvelocity == -1) return;
    Yvelocity = 0;
    Xvelocity = 1;
  }
};

document.addEventListener("keydown", keyDown);

drawGame();
