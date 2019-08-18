const express = require('express');
const User = require('../models/user');

const router = new express.Router();

// POST /api/users
//
// create new user
router.post('/api/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send({ user });
});

module.exports = router;
