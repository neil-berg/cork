require('../db/mongoose');

const User = require('../models/user');

const sampleUser = {
  name: 'name14444',
  username: 'username:14444',
  email: 'email14444@email.com',
  password: 'jjsjdf234321@@'
};

// const seedUsers = async () => {
//   const user = new User(sampleUser);
//   await user.save();
// };

const lastChance = async () => {
  const user = new User(sampleUser);
  await user.save();
  console.log('finished seeding');
};

lastChance();

// module.exports = seedUsers;
