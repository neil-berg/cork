require('../db/mongoose');
const faker = require('faker');
const sharp = require('sharp');
const path = require('path');

const User = require('../models/user');
const Wine = require('../models/wine');

const seedDatabase = async (numUsers = 3, numWines = 5) => {
  let userCount = 0;
  while (userCount < numUsers) {
    // Create a sample user
    const sampleUser = {
      name: faker.name.findName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'red1234!'
    };

    // Generate a fake user avatar
    const avatarFile = path.join(
      __dirname,
      `/assets/user-avatar-${Math.floor(Math.random() * 3)}.jpeg`
    );
    const avatarBuffer = await sharp(avatarFile)
      .rotate()
      .resize({ width: 100, height: 100 })
      .jpeg()
      .toBuffer();
    sampleUser.avatar = avatarBuffer;
    const user = new User(sampleUser);
    await user.save();
    userCount++;

    // Attach n wines to this user
    let wineCount = 0;
    while (wineCount < numWines) {
      const sampleWine = {
        owner: user._id,
        name: faker.commerce.productName(),
        type: 'red',
        rating: Math.floor(Math.random() * 6),
        likes: Math.floor(Math.random() * 100000),
        review: faker.lorem.sentence()
      };
      // Generate a fake wine image
      const imageFile = path.join(
        __dirname,
        `/assets/wine-image-${Math.floor(Math.random() * 3)}.JPG`
      );
      const imageBuffer = await sharp(imageFile)
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
      sampleWine.image = imageBuffer;
      const wine = new Wine(sampleWine);
      await wine.save();
      wineCount++;
    }
  }
};

seedDatabase(3, 5)
  .then(() => console.log('finished seeding'))
  .catch(err => console.log(err));
