const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const {testBlogs} = require('./test_helper');

const api = supertest(app);


beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(testBlogs);
});

afterAll(() => {
  mongoose.connection.close()
});


describe('Acquisition of blogs', () => {

  test('All blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(6);
  });

  test('All blogs contain id field', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body.map(x => x.id)).toBeDefined();
  });

});

describe('Addition of blogs', () => {

  test('Blogs increase by one when a new one is added', async () => {
    await api
      .post('/api/blogs')
      .send({
        title: "New blog",
        author: "Me, Myself and I",
        url: "http://localhost",
        likes: 42
      });

    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(6 + 1);
  });

  test('Likes are defaulted to 0 when a new blog is added', async () => {
    await api
      .post('/api/blogs')
      .send({
        title: "New blog",
        author: "Me, Myself and I",
        url: "http://localhost"
      })
      .expect(201)
      .expect((response) => expect(response.body.likes).toBe(0));
  });

  test('Request fails (400) when adding a new blog with title missing', async () => {
    await api
      .post('/api/blogs')
      .send({
        author: "Me, Myself and I",
        url: "http://localhost"
      })
      .expect(400);
  });

  test('Request fails (400) when adding a new blog with author missing', async () => {
    await api
      .post('/api/blogs')
      .send({
        title: "New blog",
        url: "http://localhost"
      })
      .expect(400);
  });

});


describe('Deletion of blogs', () => {

  test('Blogs decrease by one when a one is deleted', async () => {
    let blogs = (await api.get('/api/blogs/').expect(200)).body;

    await api.delete('/api/blogs/' + blogs[0].id).expect(204);

    blogs = (await api.get('/api/blogs').expect(200)).body;
    expect(blogs).toHaveLength(6 - 1);
  });

  test('Request fails (404) when deleting a blog with non-existing id', async () => {
    await api.delete('/api/blogs/5a422a851b54a676234d17f6').expect(404);
  });

  test('Request fails (400) when deleting a blog with a malformed id', async () => {
    await api.delete('/api/blogs/wrong').expect(400);
  });

});

describe('Modification of blogs', () => {

  test('Blogs stay the same size when one is modified and the new one is returned', async () => {
    const newBlog = {
        title: "New blog",
        author: "Me, Myself and I",
        url: "http://localhost",
        likes: 42
      };

    let blogs = (await api.get('/api/blogs/').expect(200)).body;
    const id = blogs[0].id;

    const response = (await api
      .put('/api/blogs/' + id)
      .send(newBlog)
      .expect(200)).body;

    expect(response).toEqual({...newBlog, id: id});

    blogs = (await api.get('/api/blogs').expect(200)).body;
    expect(blogs).toHaveLength(6);
  });

  test('Request fails (404) when modifying a blog with non-existing id', async () => {
    await api
      .put('/api/blogs/5a422a851b54a676234d17f6')
      .send({
        title: "New blog",
        author: "Me, Myself and I",
        url: "http://localhost",
        likes: 42
      })
      .expect(404);
  });

  test('Request fails (400) when modifying a blog with a malformed id', async () => {
    await api
      .put('/api/blogs/wrong')
      .send({
        title: "New blog",
        author: "Me, Myself and I",
        url: "http://localhost",
        likes: 42
      })
      .expect(400);
  });

});
