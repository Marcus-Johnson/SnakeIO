const express = require('express');
const router = express.Router();
const { createPlayer, getPlayer } = require('../controllers/gameController');

router.post('/player', createPlayer);
router.get('/player/:id', getPlayer);

module.exports = router;