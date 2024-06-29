const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('updatePlayer', (data) => {
    let snake = snakes.find(s => s.id === data.id);
    if (snake) {
        snake.body = data.body;
    } else {
        let newSnake = new Snake(data.id, data.color);
        newSnake.body = data.body;
        snakes.push(newSnake);
    }
});

socket.on('updateFood', (data) => {
    food = data.map(f => new Food(f.x, f.y, f.size, f.color));
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});