const User = require('../models/user');

const sampleUser = {
  name: 'name1',
  username: 'username:1',
  email: 'email@email.com',
  password: 'jjsjdf234321@@'
};

const seedUsers = async () => {
  const user = new User(sampleUser);
  await user.save();
};

module.exports = seedUsers;
