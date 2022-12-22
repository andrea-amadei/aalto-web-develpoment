import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdotesReducer';
import {setNotification} from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const add = async (e) => {
    e.preventDefault();

    dispatch(createAnecdote(e.target.anecdote.value));
    dispatch(setNotification(`Added an anecdote: ${e.target.anecdote.value}`, 3000));

    e.target.anecdote.value = '';
  }

  return (
    <div className="anecdote-form">
      <h3>Add anecdote</h3>
      <form onSubmit={add}>
        <input name="anecdote" />
        <span> </span>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm;