const Player = require('../models/Player');

exports.createPlayer = async (req, res) => {
  const { username } = req.body;
  try {
    let player = new Player({ username });
    await player.save();
    res.status(201).json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPlayer = async (req, res) => {
  const { id } = req.params;
  try {
    const player = await Player.findById(id);
    if (!player) {
      return res.status(404).json({ msg: 'Player not found' });
    }
    res.json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};