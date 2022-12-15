const jwt = require("jsonwebtoken");

const blogsController = require('express').Router();
const Blog = require('../models/blog');
const User = require("../models/user");

blogsController.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

  response.json(blogs);
})

blogsController.post('/', async (request, response) => {
  const body = request.body;

  if(!body.userId)
    return response.status(400).json({ error: 'UserID is mandatory' });

  if(!request.token)
    return response.status(401).json({ error: 'Token is missing' });

  if(body.userId !== request.user.id)
    return response.status(401).json({ error: 'Token is invalid for the requested user' });

  const user = await User.findById(body.userId);

  const blog = await new Blog({...request.body, user: user.id});

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  response.status(201).json(savedBlog);
})

blogsController.delete('/:id', async (request, response) => {
  if(!request.token)
    return response.status(401).json({ error: 'Token is missing' });

  const blog = await Blog.findById(request.params.id).populate('user');

  if(!blog)
    return response.status(404).send({ error: 'Id not found' });

  if(blog.user.id !== request.user.id)
    return response.status(401).json({ error: 'Token is invalid for the requested user' });

  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
})

blogsController.put('/:id', async (request, response) => {
  if(!request.body)
    return response.status(400).send({ error: 'Body is missing' });

  const oldBlog = await Blog.findById(request.params.id);

  if(!oldBlog)
    return response.status(404).send({ error: 'Id not found' });

  const result = await Blog
    .findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true, context: 'query' });

  response.json(result);
})

module.exports = blogsController;
