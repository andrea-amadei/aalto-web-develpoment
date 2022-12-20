import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdotesReducer';
import { displayNotification, hideNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdote(id));

    dispatch(displayNotification('Voted an anecdote'));
    setTimeout(() => dispatch(hideNotification()), 3000);
  };

  return (
    <div className="anecdote-list" style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 20 }}>
      {anecdotes.filter(anecdote => anecdote.content.includes(filter)).map(anecdote =>
        <div key={anecdote.id}>
          <div className="content">{anecdote.content}</div>
          <div>
            <span className="votes">Votes: {anecdote.votes}</span>
            <span> </span>
            <button className="vote-button" onClick={() => vote(anecdote.id)}>Vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList;
