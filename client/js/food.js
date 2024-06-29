class Food {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }
}

function generateFood() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = 5;
    const color = 'red';
    return new Food(x, y, size, color);
}

for (let i = 0; i < 20; i++) {
    food.push(generateFood());
}