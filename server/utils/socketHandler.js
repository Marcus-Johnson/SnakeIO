const Player = require('../models/Player');

const handleSocketConnection = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    socket.on('playerMovement', (data) => {
      io.emit('updatePlayer', data);
    });

    socket.on('playerScore', async (data) => {
      const { playerId, score } = data;
      try {
        const player = await Player.findById(playerId);
        if (player) {
          player.score = score;
          await player.save();
          io.emit('updateScore', player);
        }
      } catch (err) {
        console.error(err.message);
      }
    });
  });
};

module.exports = handleSocketConnection;