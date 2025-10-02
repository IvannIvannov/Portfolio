let scoreEl = null;
let highScoresEl = null;
let highScores = JSON.parse(localStorage.getItem("snakeHighScores")) || [];

window.addEventListener("load", () => {
    const canvas = document.getElementById("snakeCanvas");
    const startBtn = document.getElementById("startGame");
    if (!canvas || !startBtn) return;

    scoreEl = document.getElementById("score");
    highScoresEl = document.getElementById("highScores");

    const ctx = canvas.getContext("2d");
    const box = 20;
    let snake, direction, food, score, game;
    let gameStarted = false;

    function initGame() {
        snake = [{ x: 8 * box, y: 8 * box }];
        direction = "RIGHT";
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
        score = 0;
        updateScore();

        document.addEventListener("keydown", control);

        if (game) clearInterval(game);
        game = setInterval(draw, 100);
        gameStarted = true;
    }

    function control(e) {
        if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
        if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
        if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
        if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    }

    function collision(head, array) {
        return array.some(seg => seg.x === head.x && seg.y === head.y);
    }

    function draw() {
        ctx.fillStyle = "#232526";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = i === 0 ? "#61dafb" : "#e0f7ff";
            ctx.shadowColor = i === 0 ? "#61dafb" : "#a0f0ff";
            ctx.shadowBlur = i === 0 ? 15 : 5;
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }
        ctx.shadowBlur = 0;

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(food.x, food.y, box, box);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction === "LEFT") snakeX -= box;
        if (direction === "UP") snakeY -= box;
        if (direction === "RIGHT") snakeX += box;
        if (direction === "DOWN") snakeY += box;

        if (snakeX === food.x && snakeY === food.y) {
            score++;
            updateScore();
            food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
        } else {
            snake.pop();
        }

        const newHead = { x: snakeX, y: snakeY };

        if (
            snakeX < 0 ||
            snakeX >= canvas.width ||
            snakeY < 0 ||
            snakeY >= canvas.height ||
            collision(newHead, snake)
        ) {
            clearInterval(game);
            gameStarted = false;
            saveHighScore(score);
            renderHighScores();
            alert("Game Over! Your score: " + score);
        }

        snake.unshift(newHead);
    }

    function updateScore() {
        if (scoreEl) scoreEl.textContent = score;
    }

    function saveHighScore(s) {
        highScores.push(s);
        highScores.sort((a, b) => b - a);
        highScores = highScores.slice(0, 5);
        localStorage.setItem("snakeHighScores", JSON.stringify(highScores));
    }

    function renderHighScores() {
        if (!highScoresEl) return;
        highScoresEl.innerHTML = "";
        highScores.forEach((s, i) => {
            const li = document.createElement("li");
            li.textContent = `${i + 1}. ${s}`;
            highScoresEl.appendChild(li);
        });
    }

    renderHighScores();

    startBtn.addEventListener("click", initGame);

    document.addEventListener("keydown", (e) => {
        const arrows = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
        if (arrows.includes(e.key) && !gameStarted) {
            initGame();
        }
    });
});
