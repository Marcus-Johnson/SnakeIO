const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const gameRoutes = require('./routes/gameRoutes');
const handleSocketConnection = require('./utils/socketHandler');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

connectDB();

app.use(express.json({ extended: false }));

app.use('/api/game', gameRoutes);

app.use(express.static(path.join(__dirname, '..', 'client')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'));
});

handleSocketConnection(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});