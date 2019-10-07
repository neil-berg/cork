const express = require('express');
const sharp = require('sharp');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Wine = require('../models/wine');
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
      .resize({ width: 100, height: 100 })
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
  try {
    // If updating password, ensure that the value entered
    // for the user's current password actually matches
    // what's in the DB first before proceeding with the update
    if (req.body.hasOwnProperty('password')) {
      // Compare hashed passwords
      const isMatch = await bcrypt.compare(
        req.body.currentPassword,
        req.user.password
      );

      if (!isMatch) {
        throw new Error();
      }

      delete req.body.currentPassword;
    }

    const propertiesToUpdate = Object.keys(req.body);
    propertiesToUpdate.forEach(property => {
      req.user[property] = req.body[property];
    });
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// PATCH /api/users/me/likes
//
// Update user's liked wines and wine's number of likes
router.patch('/api/users/me/likes', auth, async (req, res) => {
  try {
    // Parse the incoming liked wine _id
    const _id = req.body._id;
    const wine = await Wine.findById(_id);

    // If the liked id already exists, the user is un-liking it,
    // so remove that liked wine from their array and also
    // decrease the number of likes for that wine by one.
    // Otherwise, concat that wine to the users list and increment likes.
    const likedIds = req.user.likedWines.map(wine => wine._id);
    if (likedIds.includes(_id)) {
      req.user.likedWines = req.user.likedWines.filter(
        wine => !wine._id.equals(_id)
      );
      wine.likes = wine.likes - 1;
    } else {
      req.user.likedWines = req.user.likedWines.concat({ _id });
      wine.likes = wine.likes + 1;
    }
    await req.user.save();
    await wine.save();
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
