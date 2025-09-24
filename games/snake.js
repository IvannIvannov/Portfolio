// snakeGame.js
window.addEventListener("load", () => {
  const canvas = document.getElementById("snakeCanvas");
  if (!canvas) return; // ако canvas не е на тази страница

  const ctx = canvas.getContext("2d");
  const box = 20;
  let snake = [{ x: 8 * box, y: 8 * box }];
  let direction = "RIGHT";
  let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
  };
  let score = 0;

  document.addEventListener("keydown", control);

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
    ctx.fillStyle = "#232526";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = i === 0 ? "#61dafb" : "#eaeaea";
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

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
      food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
    } else {
      snake.pop();
    }

    const newHead = { x: snakeX, y: snakeY };

    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
      clearInterval(game);
      alert("Game Over! Your score: " + score);
    }

    snake.unshift(newHead);
  }

  const game = setInterval(draw, 100);
});
