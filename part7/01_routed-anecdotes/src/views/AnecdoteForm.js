import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdotesReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks/useField';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [content, resetContent] = useField('text');
  const [author, resetAuthor] = useField('text');

  const handleAdd = (e) => {
    e.preventDefault();

    dispatch(createAnecdote(content.value, author.value));
    dispatch(setNotification(`Added an anecdote: ${content.value}`, 3000));

    navigate('/');
  }

  const handleReset = (e) => {
    e.preventDefault();

    resetContent();
    resetAuthor();
  }

  return (
    <div className="anecdote-form">
      <h3>Add anecdote</h3>
      <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div>
          <label htmlFor="content">Content</label>
          <span></span>
          <input id="content" name="content" {...content} />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <span> </span>
          <input id="author" name="author" {...author} />
        </div>
        <div>
          <button type="submit">Add</button>
          <span> </span>
          <button onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  )
}

export default AnecdoteForm;