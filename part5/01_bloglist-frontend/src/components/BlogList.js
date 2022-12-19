import './BlogList.css'

import AddBlogForm from './AddBlogForm';
import { useEffect, useState } from 'react';
import blogService from '../services/blogs';
import Toggleable from './Toggleable';
import ToggleableBlog from './ToggleableBlog';
import blogsService from '../services/blogs';

const BlogList = ({ token, setNotification }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs);
    })
  }, []);

  const handleLike = (blog) => {
    blogService
      .setLikes(blog.id, blog.likes + 1)
      .then(response => {
        blog.likes = response.likes;

        setNotification({ message: 'Blog liked successfully', type: 'success' });
        setTimeout(() => setNotification({ message: null, type: 'success' }), 5000);
      })
      .catch(error => {
        setNotification({ message: `Unable to like blog: ${error.response.data.error}`, type: 'error' });
        setTimeout(() => setNotification({ message: null, type: 'error' }), 5000);
      });
  }

  const handleDelete = (blog) => {
    if(!window.confirm(`Delete "${blog.title}" forever?`))
      return;

    blogService
      .remove(blog.id, localStorage.getItem('token'))
      .then(() => {
        setBlogs(blogs.filter(x => x.id !== blog.id));

        setNotification({ message: 'Blog removed successfully', type: 'warning' });
        setTimeout(() => setNotification({ message: null, type: 'warning' }), 5000);
      })
      .catch(error => {
        setNotification({ message: `Unable to remove blog: ${error.response.data.error}`, type: 'error' });
        setTimeout(() => setNotification({ message: null, type: 'error' }), 5000);
      });
  }

  const handleCreate = (title, author, url) => {
    const userId = localStorage.getItem('id');

    if(!userId) {
      setNotification({ message: 'Invalid username or password', type: 'error' });
      setTimeout(() => setNotification({ message: null, type: 'error' }), 5000);
      return;
    }

    blogsService
      .add(title, author, url, userId, token)
      .then((response) => {
        setBlogs(blogs.concat(response));

        setNotification({ message: 'Blog added successfully', type: 'success' });
        setTimeout(() => setNotification({ message: null, type: 'success' }), 5000);
      })
      .catch((error) => {
        setNotification({ message: `Unable to add blog: ${error.response.data.error}`, type: 'error' });
        setTimeout(() => setNotification({ message: null, type: 'error' }), 5000);
      });

  };

  const sortedArray = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>Blogs</h2>

      <Toggleable buttonLabel="New blog">
        {( token ?
          <AddBlogForm handleCreate={handleCreate} />
          :
          <div>Login to add blogs</div>
        )}
      </Toggleable>

      <br />

      <div className="blog-list">
        {sortedArray.map(blog =>
          <ToggleableBlog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}

export default BlogList;
