//Variable List
var blockSize = 20; // snake size
var rows = 20; // snake function
var cols = 20; // snake function
var board;// game board
var context;
var drawScore; // drawing score
var restartGame; //restarting game
var gameOver; //GameOver

var snakeyX;//Snake head
var snakeyY;//Snake head

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];


var score = 0; // score

//bait
var munchyX;
var munchyY;


//Scoring Function Variables
var youLose = false;

var score = 0;

var scoreElement;


function startGame() {
    var gameScreen = document.getElementById("game-screen");
    gameScreen.style.display = "block";
    // Initialize your game here
}



// Calculating Score function

    function drawScore() {
    updateScore();// update current score
}

    function updateScore() {
    var scoreElement = document.getElementById("score"); // calling the element to score
    if (youLose === false) {
       scoreElement.innerHTML = "Score: " + score;
    }
    else {
      scoreElement.innerHTML = " GAME OVER <br> Your Score: " + score;
        }    
    }

    //Calling the movement 

    window.onload = function () {
        board = document.getElementById("board");
        board.height = rows * blockSize;
        board.width = cols * blockSize;
        context = board.getContext("2d"); //drawing on the board
    
        snakeyX = blockSize * 3;
        snakeyY = blockSize * 3;
    
         placeFood();
    
    document.addEventListener("keyup", changeDirection);
    // Add event listener to button
    document.getElementById("restart-button").addEventListener("click", restartGame);

    currentGame = setInterval(startGame, 100);
}

//Operating Objects
function startGame() {
    if (youLose) {
        return;
    }

    drawScore();
    context.fillStyle = "black"; // color of the game board
    context.fillRect(0, 0, board.width, board.height); //height/width of the gameboard

    context.fillStyle = "pink"; // The snakes food
    context.fillRect(munchyX, munchyY, blockSize, blockSize); // where the food jumps too.

    // snake growth if statement
    if (snakeyX == munchyX && snakeyY == munchyY) {
        snakeBody.push([munchyX, munchyY]); 
        score += 2; // adding of the score calculation
        placeFood();// where to put the food
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeyX, snakeyY];
    }
   
    context.fillStyle = "teal"; //snake character
    snakeyX += velocityX * blockSize; //bigger the snake the faster it goes
    snakeyY += velocityY * blockSize;//bigger the snake the faster it goes
    context.fillRect(snakeyX, snakeyY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);


    }


    //You lose conditioning


    if (snakeyX < 0 || snakeyX > cols * blockSize || snakeyY < 0 || snakeyY > rows * blockSize) {
        youLose = true; //Stop ongoing game loop
        updateScore(); //update the score   
        clearInterval(currentGame); //Clear the recent game

    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeyX == snakeBody[i][0] && snakeyY == snakeBody[i][1]) {
            youLose = true; // Stop ongoing game loop
            updateScore(); //update the score
            clearInterval(currentGame); // Clear the recent game
        }
    }

}



//Function controls Arrows
function changeDirection(s) {
    if (s.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (s.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (s.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (s.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


// function placing food
function placeFood() {
    munchyX = Math.floor(Math.random() * cols) * blockSize;
    munchyY = Math.floor(Math.random() * rows) * blockSize;
}

//snakeBody collision function
    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
        if (snakeyX == array[i].x && snakeyY == array[i].y) {
            return true;
        }
    }
    return false;
}

// Draw function for canvas

function draw() {
    for (var i = 0; i < snakeyX.length; i++) {
        ctx.fillStyle = "white";
        ctx.fillRect(snakeyX[i].x, snakeyX[i].y, blockSize, blockSize);
    }
}


// Define function to handle button click event
function restartGame() {
    console.log("restarting ...")
    // Reset score
    score = 0;
    youLose = false;
    

    velocityX = 0; //reseting the x axis movement
    velocityY = 0; // reseting the y axis movement
    snakeyX = blockSize * 3; //assigning snake head on X axis to mulitply by 3 
    snakeyY = blockSize * 3; // assigning snake head on y axis to mulitply by 3 

    snakeBody = []
    
    draw()
    drawScore()
    placeFood()
    
    clearInterval(currentGame); // Stop the current interval
    currentGame = setInterval(startGame, 100); // Start a new interval
    
    console.log("Game restarted!");
}

