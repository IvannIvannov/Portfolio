window.addEventListener("load", () => {
    const canvas = document.getElementById("snakeCanvas");
    const startBtn = document.getElementById("startGame");
    if (!canvas || !startBtn) return;

    const ctx = canvas.getContext("2d");
    const box = 20;
    let snake, direction, food, score, game;
    let gameStarted = false; // флаг за стартиране

    function initGame() {
        snake = [{ x: 8 * box, y: 8 * box }];
        direction = "RIGHT";
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
        score = 0;

        document.addEventListener("keydown", control);

        if (game) clearInterval(game); // ако играта вече е стартирана
        game = setInterval(draw, 100);
        gameStarted = true; // вече е стартирала
    }

    function control(e) {
        if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
        if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
        if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
        if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    }

    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x === array[i].x && head.y === array[i].y) return true;
        }
        return false;
    }

    function draw() {
        // фон
        ctx.fillStyle = "#232526";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // рисуваме змията с glow
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = i === 0 ? "#61dafb" : "#e0f7ff";
            ctx.shadowColor = i === 0 ? "#61dafb" : "#a0f0ff";
            ctx.shadowBlur = i === 0 ? 15 : 5;
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }
        ctx.shadowBlur = 0;

        // рисуваме храната
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(food.x, food.y, box, box);

        // score display
        ctx.fillStyle = "#ffffff";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 10, 30);

        // движение
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction === "LEFT") snakeX -= box;
        if (direction === "UP") snakeY -= box;
        if (direction === "RIGHT") snakeX += box;
        if (direction === "DOWN") snakeY += box;

        // проверка за храна
        if (snakeX === food.x && snakeY === food.y) {
            score++;
            food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
        } else {
            snake.pop();
        }

        const newHead = { x: snakeX, y: snakeY };

        // проверка за Game Over
        if (
            snakeX < 0 ||
            snakeX >= canvas.width ||
            snakeY < 0 ||
            snakeY >= canvas.height ||
            collision(newHead, snake)
        ) {
            clearInterval(game);
            gameStarted = false;
            alert("Game Over! Your score: " + score);
        }

        snake.unshift(newHead);
    }

    // Стартира играта само при клик на бутона
    startBtn.addEventListener("click", initGame);

    // Стартира играта при първото натискане на стрелка
    document.addEventListener("keydown", (e) => {
        const arrows = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
        if (arrows.includes(e.key) && !gameStarted) {
            initGame();
        }
    });
});
