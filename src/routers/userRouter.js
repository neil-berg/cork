const express = require('express');
const sharp = require('sharp');

const User = require('../models/user');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = new express.Router();

// TEST
// router.post('/api/test', (req, res) => {
//   console.log(req.header('Authorization'));
//   res.send({ message: 'from express' });
// });

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
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

// POST /api/users/me/avatar
//
// Upload user avatar
router.post(
  '/api/users/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 200, height: 200 })
      .jpeg()
      .toBuffer();

    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

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
// Read information of authenticated user
router.get('/api/users/me', auth, async (req, res) => {
  res.send(req.user);
});

// GET /api/users/:id/avatar
//
// Get user avatar
router.get('/api/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set('Content-Type', 'image/jpeg');
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
});

// PATCH /api/users/me
//
// Update information for authenticated user
router.patch('/api/users/me', auth, async (req, res) => {
  const propertiesToUpdate = Object.keys(req.body);
  // Todo: front end validation/sanitizing for valid update properties
  try {
    propertiesToUpdate.forEach(property => {
      req.user[property] = req.body[property];
    });
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE /api/users/me
//
// Remove user
router.delete('/api/users/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(401).send();
  }
});

module.exports = router;
