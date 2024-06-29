const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snakes = [];
let food = [];
let score = 0;

const scoreDisplay = document.getElementById('score');
let lastUpdateTime = 0;
const updateInterval = 50;

const snake = new Snake('local', 'green');
snake.body.push({ x: 100, y: 100 });
snakes.push(snake);

for (let i = 0; i < 20; i++) {
    food.push(new Food(Math.random() * canvas.width, Math.random() * canvas.height, 5, 'red'));
}

function drawSnake(snake) {
    ctx.fillStyle = snake.color;
    snake.body.forEach(segment => {
        ctx.beginPath();
        ctx.arc(segment.x, segment.y, snake.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
}

function drawFood(foodItem) {
    const outerRadius = foodItem.size * 2;
    const gradient = ctx.createRadialGradient(foodItem.x, foodItem.y, foodItem.size / 2, foodItem.x, foodItem.y, outerRadius);
    gradient.addColorStop(0, foodItem.color);
    gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(foodItem.x, foodItem.y, outerRadius, 0, 2 * Math.PI);
    ctx.fill();
}

function updateGame(currentTime) {
    if (currentTime - lastUpdateTime >= updateInterval) {
        lastUpdateTime = currentTime;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        snakes.forEach(snake => {
            snake.move();
            if (snake.checkCollision()) {
                alert('Game Over!');
                document.location.reload();
            }
            drawSnake(snake);
        });

        food.forEach((foodItem, index) => {
            drawFood(foodItem);
            const snakeHead = snakes[0].body[0];
            if (Math.hypot(snakeHead.x - foodItem.x, snakeHead.y - foodItem.y) < snake.size) {
                snakes[0].grow();
                food.splice(index, 1);
                food.push(generateFood());
                score += 10;
                scoreDisplay.innerText = score;
            }
        });
    }
    requestAnimationFrame(updateGame);
}

requestAnimationFrame(updateGame);