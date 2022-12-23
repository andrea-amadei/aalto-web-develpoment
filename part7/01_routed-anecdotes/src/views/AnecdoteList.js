import { useSelector } from 'react-redux';
import ShortAnecdote from "../components/ShortAnecdote";
import Filter from "../components/Filter";

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes);
  const filter = useSelector(state => state.filter);

  return (
    <>
      <h3>All anecdotes</h3>
      <Filter />
      <div className="anecdote-list" style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 20 }}>
        {anecdotes.filter(anecdote => anecdote.content.includes(filter)).map(anecdote =>
          <ShortAnecdote key={anecdote.id} anecdote={anecdote} />
        )}
      </div>
    </>
  )
}

export default AnecdoteList;
