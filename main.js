// Size of the game area (in px)
const GAME_AREA_WIDTH = 700;
const GAME_AREA_HEIGHT = 500;

// Size of the paddles (in px)
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 20;

// Size of the ball (in px)
const BALL_SIZE = 20;

// Get the computer paddle element
const computerPaddle = document.querySelector('.computer-paddle');
const playerPaddle = document.querySelector('.player-paddle');
const ball = document.querySelector('.ball');
const gameArea = document.querySelector('.game-area');
const right = gameArea.clientWidth;
const bottom = gameArea.clientHeight;

// The y-velocity of the computer paddle
let computerPaddleYPosition = 0;
// let computerPaddleYVelocity = 2;
let ballYPosition = 0;
let ballXPosition = 0;
let ballYVelocity = 4;
let ballXVelocity = 4;
let playerPaddleYPosition = parseInt(getComputedStyle(playerPaddle).getPropertyValue('top'));
let playerPaddleYVelocity = 5;


function update() {

    ballXPosition += ballXVelocity;
    ballYPosition += ballYVelocity;

    if(ballXPosition > right - ball.clientWidth - computerPaddle.clientWidth && ballYPosition < computerPaddleYPosition + computerPaddle.clientHeight && ballYPosition + ball.clientHeight > computerPaddleYPosition){
        ballXPosition = right - ball.clientWidth - computerPaddle.clientWidth
    };
    if (ballXPosition === right - ball.clientWidth - computerPaddle.clientWidth && ballYPosition < computerPaddleYPosition + computerPaddle.clientHeight && ballYPosition + ball.clientHeight > computerPaddleYPosition) {
        ballXVelocity = -ballXVelocity;
    }

    if (ballXPosition < playerPaddle.clientWidth && ballYPosition < playerPaddleYPosition + playerPaddle.clientHeight && ballYPosition + ball.clientHeight > playerPaddleYPosition) {
        ballXPosition = playerPaddle.clientWidth
    }
    if (ballXPosition === playerPaddle.clientWidth && ballYPosition < playerPaddleYPosition + playerPaddle.clientHeight && ballYPosition + ball.clientHeight > playerPaddleYPosition) {
        ballXVelocity = -ballXVelocity;
    }

    if (ballYPosition >= bottom - ball.clientHeight || ballYPosition <= 0) {
        ballYVelocity = -ballYVelocity;
    };

    if (ballXPosition >= right - ball.clientWidth || ballXPosition <= 0) {
        ballYPosition = bottom/2;
        ballXPosition = right/2;
    };

    ball.style.top = `${ballYPosition}px`;
    ball.style.left = `${ballXPosition}px`;



    computerPaddleYPosition = ballYPosition - computerPaddle.clientHeight/2;

    if (computerPaddleYPosition > bottom - computerPaddle.clientHeight){
        computerPaddleYPosition = bottom - computerPaddle.clientHeight;
    } else if(computerPaddleYPosition < 0){
        computerPaddleYPosition = 0;
    };

    computerPaddle.style.top = `${computerPaddleYPosition}px`;
}

// Call the update() function every 35ms
setInterval(update, 35);

window.addEventListener('keydown',movePaddle);

function movePaddle(e){
if (e.code == 'ArrowUp'){
    if(playerPaddleYPosition > 0){
    playerPaddleYPosition -= playerPaddleYVelocity;
    };
} else if (e.code == 'ArrowDown'){
    if(playerPaddleYPosition < bottom - playerPaddle.clientHeight){
    playerPaddleYPosition += playerPaddleYVelocity;
    };
};
playerPaddle.style.top = `${playerPaddleYPosition}px`;
};