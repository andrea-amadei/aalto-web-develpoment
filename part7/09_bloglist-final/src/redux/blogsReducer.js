import { createSlice } from '@reduxjs/toolkit';
import blogsService from '../services/blogs';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setAllBlogsReducer: (state, action) => {
      return action.payload;
    },

    addBlogReducer: (state, action) => {
      return state.concat(action.payload);
    },

    removeBlogReducer: (state, action) => {
      return state.filter(x => x.id !== action.payload);
    },

    setBlogLikesReducer: {
      prepare: (blogId, likes) => ({ payload: { blogId, likes } }),
      reducer: (state, action) => {
        return state.map(x => x.id === action.payload.blogId ? { ...x, likes: action.payload.likes } : x);
      }
    }
  }
});

const { setAllBlogsReducer, addBlogReducer, removeBlogReducer, setBlogLikesReducer } = blogsSlice.actions;

export const initializeBlogs = () => {
  return async dispatch => {
    const newBlogs = await blogsService.getAll();
    dispatch(setAllBlogsReducer(newBlogs));
  }
}

export const addBlog = (title, author, url, userId, token) => {
  return async dispatch => {
    const newBlog = await blogsService.add(title, author, url, userId, token);
    dispatch(addBlogReducer(newBlog));
  }
}

export const removeBlog = (blogId, token) => {
  return async dispatch => {
    await blogsService.remove(blogId, token);
    dispatch(removeBlogReducer(blogId));
  }
}

export const setBlogLikes = (blogId, likes) => {
  return async dispatch => {
    const blog = await blogsService.setLikes(blogId, likes);
    dispatch(setBlogLikesReducer(blog.id, blog.likes));
  }
}

export default blogsSlice.reducer;