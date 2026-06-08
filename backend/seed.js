const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Vote = require('./models/Vote');

mongoose.connect('mongodb://localhost:27017/votingapp');

async function seed() {
  await User.deleteMany({});
  await Vote.deleteMany({});

  const users = [
    { username: 'user1',  password: 'pass1',  role: 'user' },
    { username: 'user2',  password: 'pass2',  role: 'user' },
    { username: 'user3',  password: 'pass3',  role: 'user' },
    { username: 'user4',  password: 'pass4',  role: 'user' },
    { username: 'user5',  password: 'pass5',  role: 'user' },
    { username: 'user6',  password: 'pass6',  role: 'user' },
    { username: 'user7',  password: 'pass7',  role: 'user' },
    { username: 'user8',  password: 'pass8',  role: 'user' },
    { username: 'user9',  password: 'pass9',  role: 'user' },
    { username: 'user10', password: 'pass10', role: 'user' },
    { username: 'admin',  password: 'admin123', role: 'admin' },
  ];

  for (let u of users) {
    const hashed = await bcrypt.hash(u.password, 10);
    await User.create({ ...u, password: hashed });
  }

  await Vote.insertMany([
    { candidate: 'Vijay',   count: 0 },
    { candidate: 'Rahul',   count: 0 },
    { candidate: 'Kowshik', count: 0 },
  ]);

  console.log('✅ Database seeded!');
  mongoose.disconnect();
}

seed();