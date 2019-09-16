const config = require('../utils/config.js');
const express = require('express');
const api = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('../models/userModel.js');
const Blog = require('../models/blogModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

api.use(cors());
api.use(bodyParser.json());

const getTokenFrom = request => {
  const authorization = request.get('Authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

const decode = token => {
  return jwt.verify(token, config.SECRET);
};

api.get('/api/users', async (request, response) => {
  try {
    let users = await User.find({}).populate('blogs');
    users = users.map(u => u.toJSON());
    response.status(200).json(users);
  } catch (err) {
    response.status(404).json({ error: 'users not found' });
  }
});

api.get('/api/users/:userId', async (request, response) => {
  try {
    let user = await User.findById(request.params.userId).populate('blogs');
    user = user.map(u => u.toJSON());
    response.status(200).json(user);
  } catch (err) {
    response.status(404).json({ error: 'could not find user(s)' });
  }
});

api.post('/api/users', async (request, response) => {
  const body = request.body;
  try {
    const users = await User.find({ userName: body.userName });
    const saltRounds = 10;

    if (process.env.NODE_ENV === 'test' && (body.password.length >= 3 && body.username.length >= 3 && body.name.length >= 2 && users.length === 0 || users === null)) {
      const passwordHash = await bcrypt.hash(body.password, saltRounds);
      const newUser = new User({
        userName: body.username,
        name: body.name,
        pw: passwordHash,
        blogs: []
      });
      const user = await newUser.save();
      response.status(201).json(user);
    } else if (body.pw.length >= 3 && body.userName.length >= 3 && body.name.length >= 2 && users.length === 0 || users === null) {
      const passwordHash = await bcrypt.hash(body.pw, saltRounds);
      const newUser = new User({
        userName: body.userName,
        name: body.name,
        pw: passwordHash,
        blogs: []
      });
      const user = await newUser.save();
      response.status(201).json(user);
    } else {
      response.status(400).json({ error: 'user already exists' });
    }
  } catch (err) {
    response.status(400).json({ error: 'could not create user' });
  }
});

api.get('/api/blogs', async (request, response) => {
  try {
    let blogs = await Blog.find({}).populate('addedBy');
    blogs = blogs.map(b => b.toJSON());
    response.status(200).json(blogs);
  } catch (err) {
    response.status(404).json({ error: 'blogs not found' });
  }
});

api.get('/api/blogs/:id', async (request, response) => {
  try {
    let blogs = await Blog.find({ _id: request.params.id }).populate('addedBy');
    blogs = blogs.map(b => b.toJSON());
    response.status(200).json(blogs);
  } catch (err) {
    response.status(404).json({ error: 'could not find blog' });
  }
});

api.post('/api/blogs', async (request, response) => {
  const body = request.body;
  const token = getTokenFrom(request);

  try {
    const decodedToken = decode(token);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    if (user !== null) {
      const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0,
        comments: [],
        addedBy: decodedToken.id
      });

      const savedBlog = await newBlog.save();
      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();
      response.status(201).json(savedBlog);
    } else {
      response.status(400).json({ error: 'username or password incorrect' });
    }
  } catch (err) {
    response.status(400).json({ error: 'could not add new blog :(' });
  }
});

api.delete('/api/blogs/:id', async (request, response) => {

  const token = getTokenFrom(request);

  try {

    const decodedToken = decode(token);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);
    const blog = await Blog.findById(request.params.id);

    if (user._id.toString() !== blog.addedBy.toString()) {
      return response.status(401).json({ error: 'invalid permissions' });
    }

    await Blog.findByIdAndRemove({ _id: request.params.id })
      .then(() => {
        response.status(204).end();
      }).catch(() => {
        response.status(401).json({ error: 'could not delete blog' });
      });
  } catch (e) {
    response.status(401).json({ error: 'couldn\'t remove blog' });
  }
});

api.delete('/api/blogs/clear', async (request, response) => {
  const token = getTokenFrom(request);

  try {

    const decodedToken = decode(token);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    await Blog.deleteMany({})
      .then(() => {
        response.status(204).end();
      }).catch(() => {
        response.status(401).json({ error: 'could not clear blogs' });
      });
  } catch (e) {
    response.status(401).json({ error: 'couldn\'t clear blogs' });
  }
});

api.put('/api/blogs/:id', async (request, response) => {

  const token = getTokenFrom(request);

  try {

    const decodedToken = decode(token);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);
    const blog = await Blog.findById(request.params.id);

    if (user._id.toString() !== blog.addedBy.toString()) {
      return response.status(401).json({ error: 'invalid permissions' });
    }

    const update = request.body;
    await Blog.findByIdAndUpdate(
      { _id: request.params.id },
      { $set: update }
    );
    response.status(200).json(update);
  } catch (e) {
    response.status(400).json({ error: 'update was unsuccessful' });
  }
});

api.post('/api/login/', async (request, response) => {
  const body = request.body;

  const user = await User.findOne({ userName: body.userName });
  const pwMatch = user === null ? false : await bcrypt.compare(body.pw, user.pw);

  if (!(user && pwMatch)) {
    return response.status(401).json({ error: 'invalid username or password' });
  } else {
    const userForToken = { userName: user.userName, id: user._id };
    const token = jwt.sign(userForToken, config.SECRET);

    response.status(200).json({ token, userName: user.userName, name: user.name });
  }
});

if (process.env.NODE_ENV === 'test') {
  api.post('/api/testing/reset', async (request, response) => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    response.status(204).end();
  });
}

module.exports = api;