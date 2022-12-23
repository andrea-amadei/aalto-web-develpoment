import {Link} from "react-router-dom";

const ShortAnecdote = ({ anecdote }) => {

  const style = {
    border: '1px solid black',
    padding: 5,
    cursor: 'pointer'
  }

  return (
    <Link to={`anecdotes/${anecdote.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
      <div style={style} className="short-anecdote">
        <div className="content">{anecdote.content}</div>
      </div>
    </Link>
  )
}

export default ShortAnecdote;