const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('./models/User');
const Vote = require('./models/Vote');

const app = express();
const SECRET = 'voting_secret_key';

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

mongoose.connect('mongodb://localhost:27017/votingapp')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log(err));

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'Invalid username or password' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: 'Invalid username or password' });

  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    SECRET,
    { expiresIn: '1h' }
  );
  res.json({ token, role: user.role });
});

app.post('/api/vote', verifyToken, async (req, res) => {
  if (req.user.role !== 'user')
    return res.status(403).json({ error: 'Admins cannot vote' });

  const user = await User.findById(req.user.id);
  if (user.hasVoted)
    return res.status(400).json({ error: 'You can vote only 1 time' });

  const { candidate } = req.body;
  const vote = await Vote.findOne({ candidate });
  if (!vote) return res.status(400).json({ error: 'Invalid candidate' });

  vote.count++;
  await vote.save();
  user.hasVoted = true;
  await user.save();

  res.json({ message: `Vote recorded for ${candidate}!` });
});

app.get('/api/results', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin')
    return res.status(403).json({ error: 'Access denied' });
  const votes = await Vote.find({});
  res.json(votes);
});

app.listen(3000, () => console.log('✅ Server running at http://localhost:3000'));