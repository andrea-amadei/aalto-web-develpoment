import {useDispatch, useSelector} from "react-redux";
import {voteAnecdote} from "../reducers/anecdotesReducer";
import {setNotification} from "../reducers/notificationReducer";
import {useParams} from "react-router-dom";

const FullAnecdote = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const anecdote = useSelector(state => state.anecdotes).find(anecdote => anecdote.id === id);

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification(`Voted an anecdote: ${anecdote.content}`, 3000));
  };

  return (
    <div className="full-anecdote">
      <h2>Anecdote</h2>
      <div className="content" style={{ marginBottom: 20 }}>{anecdote.content}</div>
      <div>
        <span className="votes">Votes: {anecdote.votes}</span>
        <span> </span>
        <button className="vote-button" onClick={() => vote(anecdote)}>Vote</button>
      </div>
    </div>
  )
}

export default FullAnecdote;