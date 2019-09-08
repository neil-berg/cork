const mongoose = require('mongoose');

const wineSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    winetype: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: ['red', 'white', 'rose', 'orange', 'sparkling']
    },
    varietal: {
      type: String,
      trim: true
    },
    vineyard: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      trim: true
    },
    region: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Wine = mongoose.model('Wine', wineSchema);

module.exports = Wine;
