const express = require('express');
const User = require('../models/user');

const auth = require('../middleware/auth');

const router = new express.Router();

// POST /api/users
//
// create new user
router.post('/api/users', async (req, res) => {
  const user = new User(req.body);
  try {
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

// POST /api/users/login
//
// login user
router.post('/api/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

// POST /api/users/logout
//
// logout user
router.post('/api/users/logout', auth, async (req, res) => {
  try {
    // Remove current token from the user
    // req.user property supplied by auth middleware
    req.user.tokens = req.user.tokens.filter(
      token => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

// POST /api/users/logoutAll
//
// logout user completely by removing all tokens
router.post('/api/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

// GET /api/users/me
//
// Read information about logged in user
router.get('/api/users/me', auth, async (req, res) => {
  res.send(req.user);
});

module.exports = router;
