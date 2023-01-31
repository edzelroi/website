 let canvas;
    let canvasContext;
    let ballX = 50;
    let ballY = 50;
    let ballSpeedX = 10;
    let ballSpeedY = 4;

    let player1Score = 0;
    let player2Score = 0;
    const WINNING_SCORE = 5;

    let showingWinScreen = false;

    let paddle1Y = 250;
    let paddle2Y = 250;
    const PADDLE_HEIGHT = 100;
    const PADDLE_THICKNESS = 10;

    function calculateMousePos(evt) {
        let rect = canvas.getBoundingClientRect();
        let root = document.documentElement;
        let mouseX = evt.clientX - rect.left - root.scrollLeft;
        let mouseY = evt.clientY - rect.top - root.scrollTop;
        return {
            x: mouseX,
            y: mouseY,
        };
    }

    window.onload = function () {

        console.log("hello");
        canvas = document.getElementById("fp-game");
        canvasContext = canvas.getContext("2d");
        let framePerSecond = 30;
        setInterval(() => {
            moveEverything();
            drawEverything();
        }, 1000 / framePerSecond);

        canvas.addEventListener("mousedown", (event) => {
            if (showingWinScreen) {
                player1Score = 0;
                player2Score = 0;
                showingWinScreen = false;
            }
        });

        canvas.addEventListener("mousemove", (event) => {
            let mousePos = calculateMousePos(event);
            paddle1Y = mousePos.y - PADDLE_HEIGHT / 2;
        });
    };

    function ballReset() {
        if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
            showingWinScreen = true;
        }
        ballSpeedX = -ballSpeedX;
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
    }

    function computerMovment() {
        let paddle2YCenter = paddle2Y + PADDLE_HEIGHT / 2;
        if (paddle2YCenter < ballY - 35) {
            paddle2Y += 6;
        } else if (paddle2YCenter > ballY + 35) {
            paddle2Y -= 6;
        }
    }

    function moveEverything() {
        if (showingWinScreen) {
            return;
        }
        computerMovment();
        ballX = ballX + ballSpeedX;
        ballY = ballY + ballSpeedY;
        if (ballX > (canvas.width-20)) {
            if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT + 10) {
                ballSpeedX = -ballSpeedX;
                let deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
                ballSpeedY = deltaY * 0.35;
            } else {
                player1Score++; //must be before ballReset()
                ballReset();
            }
        }
        if (ballX < 20) {
            if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT +10) {
                ballSpeedX = -ballSpeedX;
                let deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
                ballSpeedY = deltaY * 0.35;
            } else {
                player2Score++;
                ballReset();
            }
        }
        if (ballY < 0) ballSpeedY = -ballSpeedY;
        if (ballY > canvas.height) ballSpeedY = -ballSpeedY;
    }

    function drawNet() {
        for (let index = 0; index < canvas.height; index += 40) {
            colorRect(canvas.width / 2 - 1, index, 2, 20, "white");
        }
    }

    function drawEverything() {
        colorRect(0, 0, canvas.width, canvas.height, "black");
        // this left player paddle

        if (showingWinScreen) {
            canvasContext.fillStyle = "white";
            if (player1Score >= WINNING_SCORE) {
                canvasContext.fillText("You Won!", 220, 277.5);
            } else if (player2Score >= WINNING_SCORE) {
                canvasContext.fillText("Edzel Won!", 220, 277.5);
            }

            canvasContext.fillText("Click to Continue", 200, 500);

            return;
        }

        drawNet();

        colorRect(0, paddle1Y, PADDLE_THICKNESS, 100, "white");

        // this is right computer Paddle
        colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, 100, "white");

        // this is ball
        colorCircle(ballX, ballY, 10, "white");

        // score
        canvasContext.font = "20px Georgia";
        canvasContext.fillText(player1Score, 100, 100);
        canvasContext.fillText(player2Score, canvas.width - 100, 100);
    }

    function colorCircle(centerX, centerY, radius, drawColor) {
        canvasContext.fillStyle = drawColor;
        canvasContext.beginPath();
        canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        canvasContext.fill();
    }

    function colorRect(leftX, topY, width, height, drawColor) {
      var mx = leftX + width / 2;
      var my = topY + height / 2;
      canvascontext.beginPath();
      canvasContext.fillStyle = drawColor;
      canvascontext.lineWidth="4";
      canvascontext.moveTo(x,my);
      canvascontext.quadraticCurveTo(leftX, topY, mx, topY);
      canvascontext.quadraticCurveTo(leftX+width, topY, leftX+width, my);
      canvascontext.quadraticCurveTo(leftX+width, topY+height, mx, topY+height);
      canvascontext.quadraticCurveTo(leftX, topY+height, leftX, my);
      canvascontext.stroke();
    }
