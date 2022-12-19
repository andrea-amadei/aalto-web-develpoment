import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const add = (e) => {
    e.preventDefault();

    dispatch(addAnecdote(e.target.anecdote.value));
    e.target.anecdote.value = '';
  }

  return (
    <div className="anecdote-form">
      <form onSubmit={add}>
        <input name="anecdote" />
        <span> </span>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AnecdoteList;