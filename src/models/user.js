const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    avatar: {
      type: Buffer
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    likedWines: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Wine'
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

// Generate new JWT when user is created from POST /api/users
// and concatenate this new JWT to the user's tokens property
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: '7 days'
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// Strip out password and token from user response object
userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

// Locate a user in the User collection by email/password
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  // Email does not exist
  if (!user) {
    throw new Error('Unable to login');
  }

  // Compare hashed passwords
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

// Before saving user (newly created or updated), hash their password
userSchema.pre('save', async function(next) {
  const user = this;

  // Only perform hashing if password on the user has been modified (or new)
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
