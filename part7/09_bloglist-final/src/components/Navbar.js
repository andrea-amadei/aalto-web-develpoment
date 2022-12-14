import './Navbar.css'

import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
    </div>
  )
}

export default Navbar;