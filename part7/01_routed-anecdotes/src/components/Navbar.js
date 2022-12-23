import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <>
      <div className="anecdote-list" style={{ display: "flex", flexDirection: "row", gap: 20, marginBottom: 20 }}>
        <Link to="/">Home</Link>
        <Link to="/create">Create new</Link>
        <Link to="/about">About</Link>
      </div>
    </>
  )
}

export default Navbar;