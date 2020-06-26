import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (

    <nav className="navbar bg-dark">
      <h1>
        <Link to="/index"><i className="fas fa-dumbbell"></i> Client Programming</Link>
      </h1>
      <ul>
        <li><Link to="/clients">Clients</Link></li>
        <li><Link to="/add">Add a client</Link></li>
        <li><Link to="/#">Logout</Link></li>
      </ul>
      {/* <form inline>
        <input type="text" placeholder="Search" className="mr-sm-2" />
        <button variant="outline-light">Search</button>
      </form> */}
    </nav>
  );
};

export default Navbar;
