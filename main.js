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

    if(ballXPosition > GAME_AREA_WIDTH - BALL_SIZE - PADDLE_WIDTH && ballYPosition < computerPaddleYPosition + PADDLE_HEIGHT && ballYPosition + BALL_SIZE > computerPaddleYPosition){
        ballXPosition = GAME_AREA_WIDTH - BALL_SIZE - PADDLE_WIDTH
    };
    if (ballXPosition === GAME_AREA_WIDTH - BALL_SIZE - PADDLE_WIDTH && ballYPosition < computerPaddleYPosition + PADDLE_HEIGHT && ballYPosition + BALL_SIZE > computerPaddleYPosition) {
        ballXVelocity = -ballXVelocity;
    }

    if (ballXPosition < PADDLE_WIDTH && ballYPosition < playerPaddleYPosition + PADDLE_HEIGHT && ballYPosition + BALL_SIZE > playerPaddleYPosition) {
        ballXPosition = PADDLE_WIDTH
    }
    if (ballXPosition === PADDLE_WIDTH && ballYPosition < playerPaddleYPosition + PADDLE_HEIGHT && ballYPosition + BALL_SIZE > playerPaddleYPosition) {
        ballXVelocity = -ballXVelocity;
    }

    if (ballYPosition >= GAME_AREA_HEIGHT - BALL_SIZE || ballYPosition <= 0) {
        ballYVelocity = -ballYVelocity;
    };

    if (ballXPosition >= GAME_AREA_WIDTH - BALL_SIZE || ballXPosition <= 0) {
        ballYPosition = GAME_AREA_HEIGHT/2;
        ballXPosition = GAME_AREA_WIDTH/2;
    };

    ball.style.top = `${ballYPosition}px`;
    ball.style.left = `${ballXPosition}px`;



    computerPaddleYPosition = ballYPosition - PADDLE_HEIGHT/2;

    if (computerPaddleYPosition > GAME_AREA_HEIGHT - PADDLE_HEIGHT){
        computerPaddleYPosition = GAME_AREA_HEIGHT - PADDLE_HEIGHT;
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
    if(playerPaddleYPosition < GAME_AREA_HEIGHT - PADDLE_HEIGHT){
    playerPaddleYPosition += playerPaddleYVelocity;
    };
};
playerPaddle.style.top = `${playerPaddleYPosition}px`;
};