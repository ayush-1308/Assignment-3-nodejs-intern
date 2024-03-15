const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/users.js');
const Post = require('./models/post.js');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// JWT-based authentication middleware
app.use(async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
    } catch (err) {
      return res.status(403).send('Invalid token');
    }
  }
  next();
});

app.get('/', (req, res) => {
  res.send('Hello');
});

// User endpoints
app.post('/users', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({ ...req.body, password: hashedPassword });
  await user.save();
  res.status(201).send(user);
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id).populate('follows');
  res.json(user);
});

app.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

// Post endpoints
app.post('/posts', async (req, res) => {
  const post = new Post({ ...req.body, user: req.user._id });
  await post.save();
  res.status(201).send(post);
});

app.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

app.put('/posts/:id', async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(post);
});

app.delete('/posts/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: 'Post deleted' });
});

// Follow endpoints
app.post('/follows', async (req, res) => {
  const user = await User.findById(req.user._id);
  user.follows.push(req.body.followId);
  await user.save();
  res.json(user);
});

app.delete('/follows/:id', async (req, res) => {
  const user = await User.findById(req.user._id);
  user.follows.pull(req.params.id);
  await user.save();
  res.json(user);
});

app.listen(3000, () => console.log('Server started'));