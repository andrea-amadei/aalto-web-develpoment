import './BlogList.css'

import AddBlogForm from './AddBlogForm';
import Toggleable from './Toggleable';
import ToggleableBlog from './ToggleableBlog';
import { setNotification } from '../redux/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog, removeBlog, setBlogLikes } from '../redux/blogsReducer';

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);

  const handleLike = (blog) => {
    dispatch(setBlogLikes(blog.id, blog.likes + 1))
      .then(() => {
        dispatch(setNotification('Blog liked successfully', 'success', 5000));
      })
      .catch(error => {
        dispatch(setNotification(`Unable to like blog: ${error.response.data.error}`, 'error', 5000));
      });
  }

  const handleDelete = (blog) => {
    if(!window.confirm(`Delete "${blog.title}" forever?`))
      return;

    dispatch(removeBlog(blog.id, user.token))
      .then(() => {
        dispatch(setNotification('Blog removed successfully', 'warning', 5000));
      })
      .catch(error => {
        dispatch(setNotification(`Unable to remove blog: ${error.response.data.error}`, 'error', 5000));
      });
  }

  const handleCreate = (title, author, url) => {
    const userId = localStorage.getItem('id');

    if(!userId) {
      dispatch(setNotification('Invalid username or password', 'error', 5000));
      return;
    }

    dispatch(addBlog(title, author, url, userId, user.token))
      .then(() => {
        dispatch(setNotification('Blog added successfully', 'success', 5000));
      })
      .catch((error) => {
        dispatch(setNotification(`Unable to add blog: ${error.response.data.error}`, 'error', 5000));
      });
  };

  const sortedArray = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>Blogs</h2>

      <Toggleable buttonLabel="New blog">
        {( user.token ?
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
