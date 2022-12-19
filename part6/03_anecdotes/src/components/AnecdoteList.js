import {useDispatch, useSelector} from "react-redux";
import {voteAnecdote} from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  const vote = (id) => dispatch(voteAnecdote(id));

  return (
    <div className="anecdote-list" style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 20 }}>
      {anecdotes.map(anecdote =>
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
