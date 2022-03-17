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
let computerPaddleYVelocity = 2;
let ballYPosition = 0;
let ballXPosition = 0;
let ballYVelocity = 4;
let ballXVelocity = 4;

// Update the pong world
function update() {
    let playerPaddleYPosition = parseInt(getComputedStyle(playerPaddle).getPropertyValue('top'));

    // Update the computer paddle's position
    computerPaddleYPosition = computerPaddleYPosition + computerPaddleYVelocity;

    if (computerPaddleYPosition === bottom - computerPaddle.clientHeight || computerPaddleYPosition === 0) {
        computerPaddleYVelocity = -computerPaddleYVelocity
    }
    // Apply the y-position 
    computerPaddle.style.top = `${computerPaddleYPosition}px`;

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
}

// Call the update() function every 35ms
setInterval(update, 35);
