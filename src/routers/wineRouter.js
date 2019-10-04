const express = require('express');
const sharp = require('sharp');

const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
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
    console.log(error);
    res.status(400).send(error);
  }
});

// POST /api/wines/:id/image
//
// Add image to a wine
router.post(
  '/api/wines/:id/image',
  auth,
  upload.single('image'),
  async (req, res) => {
    const _id = req.params.id;
    try {
      const wine = await Wine.findOne({ _id, owner: req.user._id });
      if (!wine) {
        return res.status(404).send();
      }

      // If wine exists, add its image as a buffer
      const buffer = await sharp(req.file.buffer)
        .resize({
          width: 400,
          height: 400,
          options: {
            fit: 'cover'
          }
        })
        .rotate()
        .jpeg()
        .toBuffer();

      wine.image = buffer;
      await wine.save();
      res.send();
    } catch (error) {
      res.status(500).send();
    }
  }
);

// GET /api/wines/all
//                &limit={#}
//                &skip={#}
//                &sortBy=createdAt:{desc|asc}
//
// Read all wines (no auth needed)
router.get('/api/wines/all', async (req, res) => {
  const sortOptions = {};
  if (req.query.sortBy) {
    const [field, direction] = req.query.sortBy.split(':');
    sortOptions[field] = direction === 'asc' ? 1 : -1;
  }

  const allOptions = {
    limit: parseInt(req.query.limit),
    skip: parseInt(req.query.skip),
    sort: sortOptions
  };

  try {
    const wines = await Wine.find(null, null, allOptions);
    if (!wines) {
      return res.status(404).send();
    }
    res.send(wines);
  } catch (error) {
    res.status(500).send();
  }
});

// GET /api/wines/mine
//
// Read wines from logged in user
router.get('/api/wines/mine', auth, async (req, res) => {
  const sortOptions = {};
  if (req.query.sortBy) {
    const [field, direction] = req.query.sortBy.split(':');
    sortOptions[field] = direction === 'asc' ? 1 : -1;
  }

  try {
    const wines = await Wine.find({ owner: req.user._id }, null, {
      sort: sortOptions
    });

    if (!wines) {
      return res.status(404).send();
    }
    res.send(wines);
  } catch (error) {
    res.status(500).send();
  }
});

// GET /api/wines/:id
//
// Read details for one wine
router.get('/api/wines/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    // Ensure this wine's owner is the authenticated user
    const wine = await Wine.findOne({ _id, owner: req.user._id });

    if (!wine) {
      return res.status(404).send();
    }

    res.send(wine);
  } catch (error) {
    res.status(500).send();
  }
});

// GET /api/wines/:id/image
//
// Get wine image
router.get('/api/wines/:id/image', async (req, res) => {
  try {
    const wine = await Wine.findById(req.params.id);
    if (!wine || !wine.image) {
      throw new Error();
    }
    res.set('Content-Type', 'image/jpeg');
    res.send(wine.image);
  } catch (error) {
    res.status(404).send();
  }
});

// PATCH /api/wines/:id
//
// Update info for one wine
router.patch('/api/wines/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const wine = await Wine.findOne({ _id, owner: req.user._id });
    const propertiesToUpdate = Object.keys(req.body);
    propertiesToUpdate.forEach(property => {
      wine[property] = req.body[property];
    });
    await wine.save();
    res.send(wine);
  } catch (error) {
    res.status(400).send(e);
  }
});

// DELETE /api/wines/:id
//
// Delete wine
router.delete('/api/wines/:id', auth, async (req, res) => {
  try {
    // Locate wine by its id and owner id
    const wine = await Wine.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!wine) {
      return res.status(404).send();
    }
    res.send(wine);
  } catch (error) {
    res.status(500).send(e);
  }
});

module.exports = router;
