import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
const Navbar = ({ logout }) => {

  return (
    <nav className="navbar bg-dark">
      <h1>
        <i className="fas fa-dumbbell" style={ { color: '#93aabd' } }></i> Smart Programming
      </h1>
      <ul>
        <li>
          <Link to="/dashboard">
            <i className="fas fa-user" style={ { color: '#fff' } }></i>
            <span className="hide-sm">Clients</span>
          </Link>
        </li>
        <li>
          <Link to="/add">
            <i className="fas fa-address-card" style={ { color: '#fff' } }></i>
            <span className="hide-sm">Add a client</span>
          </Link>
        </li>
        <li><Link onClick={ logout } to="/">
          <i className="fas fa-sign-out-alt" style={ { color: '#fff' } }></i>
          <span className="hide-sm">Logout</span>
        </Link>
        </li>
      </ul>
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Navbar);
