class Snake {
    constructor(id, color) {
        this.id = id;
        this.color = color;
        this.size = 10;
        this.body = [{ x: 50, y: 50 }];
        this.speed = 8;
        this.direction = { x: 1, y: 0 };
    }

    move() {
        const head = this.body[0];
        const newHead = {
            x: head.x + this.direction.x * this.speed,
            y: head.y + this.direction.y * this.speed
        };
        this.body.unshift(newHead);
        this.body.pop();
    }

    grow() {
        const tail = this.body[this.body.length - 1];
        this.body.push({ x: tail.x, y: tail.y });
    }

    setDirectionToMouse(mouseX, mouseY) {
        const head = this.body[0];
        const angle = Math.atan2(mouseY - head.y, mouseX - head.x);
        this.direction = { x: Math.cos(angle), y: Math.sin(angle) };
    }

    checkCollision() {
        const head = this.body[0];
        if (head.x < 0 || head.x > canvas.width || head.y < 0 || head.y > canvas.height) {
            return true;
        }
        return false;
    }
}

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const snake = snakes[0];
    snake.setDirectionToMouse(mouseX, mouseY);
});