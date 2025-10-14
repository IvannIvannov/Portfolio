let scoreEl = null;
let highScoresEl = null;
let highScores = JSON.parse(localStorage.getItem("snakeHighScores")) || [];

window.addEventListener("load", () => {
    const canvas = document.getElementById("snakeCanvas");
    const startBtn = document.getElementById("startGame");
    const overlay = document.getElementById("gameOverOverlay");
    const finalScoreEl = document.getElementById("finalScore");
    const restartBtn = document.getElementById("restartBtn");
    const cancelBtn = document.getElementById("cancelBtn");

    if (!canvas || !startBtn || !overlay) return;

    scoreEl = document.querySelector(".current-score span");
    highScoresEl = document.getElementById("highScores");

    const ctx = canvas.getContext("2d");
    const box = 20;
    let snake, direction, food, score, game;
    let gameStarted = false;

    function initGame() {
        snake = [{ x: 8 * box, y: 8 * box, pulse: false }];
        direction = "RIGHT";
        food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
        score = 0;
        updateScore();

        document.addEventListener("keydown", control);

        if (game) clearInterval(game);
        game = setInterval(draw, 70);
        gameStarted = true;
    }

    function control(e) {
        if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
        if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
        if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
        if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    }

    function collision(head, array) {
        return array.some(seg => Math.round(seg.x) === Math.round(head.x) && Math.round(seg.y) === Math.round(head.y));
    }

    function draw() {
        ctx.fillStyle = "#1f1f1f";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < snake.length; i++) {
            let seg = snake[i];
            if (i > 0) {
                seg.x += (snake[i - 1].x - seg.x) * 0.18;
                seg.y += (snake[i - 1].y - seg.y) * 0.18;
            }

            let gradient = ctx.createRadialGradient(seg.x + box / 2, seg.y + box / 2, 2, seg.x + box / 2, seg.y + box / 2, box);
            gradient.addColorStop(0, i === 0 ? "#61dafb" : "#4bb0e0");
            gradient.addColorStop(1, "transparent");

            ctx.fillStyle = gradient;
            ctx.shadowColor = i === 0 ? "#61dafb" : "#4bb0e0";
            ctx.shadowBlur = i === 0 ? 20 : 10;

            if (i === 0 && seg.pulse) {
                ctx.save();
                ctx.translate(seg.x + box / 2, seg.y + box / 2);
                ctx.scale(1.25, 1.25);
                ctx.fillRect(-box / 2, -box / 2, box, box);
                ctx.restore();
                seg.pulse = false;
            } else {
                ctx.fillRect(seg.x, seg.y, box, box);
            }
        }
        ctx.shadowBlur = 0;

        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#61dafb";
        ctx.shadowBlur = 15;
        ctx.fillRect(food.x, food.y, box, box);
        ctx.shadowBlur = 0;

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction === "LEFT") snakeX -= box;
        if (direction === "UP") snakeY -= box;
        if (direction === "RIGHT") snakeX += box;
        if (direction === "DOWN") snakeY += box;

        if (Math.round(snakeX) === food.x && Math.round(snakeY) === food.y) {
            score++;
            updateScore();
            scoreEl.classList.add("pulse");
            setTimeout(() => scoreEl.classList.remove("pulse"), 300);
            snake[0].pulse = true;
            food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
        } else {
            snake.pop();
        }

        const newHead = { x: snakeX, y: snakeY, pulse: false };

        if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
            clearInterval(game);
            gameOver();
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
        renderHighScores(s);
    }

    function renderHighScores(newScore = null) {
        if (!highScoresEl) return;
        highScoresEl.innerHTML = "";
        highScores.forEach((s, i) => {
            const li = document.createElement("li");
            li.textContent = s;

            if (newScore !== null && s === newScore && i === 0) li.classList.add("new-score");
            highScoresEl.appendChild(li);
        });
    }

    function gameOver() {
        gameStarted = false;
        saveHighScore(score);
        finalScoreEl.textContent = score;
        overlay.classList.add("show");

        restartBtn.onclick = () => {
            overlay.classList.remove("show");
            initGame();
        }

        cancelBtn.onclick = () => {
            overlay.classList.remove("show");
        }
    }

    renderHighScores();

    startBtn.addEventListener("click", initGame);

    document.addEventListener("keydown", (e) => {
        const arrows = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
        if (arrows.includes(e.key) && !gameStarted) initGame();
    });
});
