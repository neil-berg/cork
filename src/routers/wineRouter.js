const express = require('express');

const auth = require('../middleware/auth');
const Wine = require('../models/wine');

const router = new express.Router();

// POST /api/wines
//
// Add new wine
router.post('/api/wines/', auth, async (req, res) => {
  const wine = new Wine({
    ...req.body,
    owner: req.user._id
  });
  try {
    await wine.save();
    res.status(201).send(wine);
  } catch (error) {
    res.status(400).send(e);
  }
});

module.exports = router;
