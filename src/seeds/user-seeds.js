const faker = require('faker');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const users = [
  {
    name: 'Don Draper'
  },
  {
    name: 'Neil Berg'
  }
];

// Add on fake username, email, and password

// const fakeUsers = users.map(user => ({
//   ...user,
//   username: faker.internet.userName(),
//   email: faker.internet.email(),
//   password: bcrypt.hashSync('red1234!', 8)
// }));

// const seedUser = user => {
//   console.log(user);
//   const newUser = new User(user);
//   newUser
//     .save()
//     .then(() => console.log('saved').catch(err => console.log(err)));
// };

// for (user of fakeUsers) {
//   seedUser(user);
// }

const user = {
  name: 'Don Draper',
  username: 'draper',
  email: 'draper@example.com',
  password: 'red1234!'
};

async function test() {
  const newUser = new User(user);
  await newUser.save();
  console.log(newUser);
}

test();
