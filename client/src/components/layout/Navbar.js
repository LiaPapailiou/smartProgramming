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
          <Link to="/exercises">
            <span style={ { paddingRight: '10px', fontSize: 16, fontWeight: 600 } }>EXERCISE LIST</span>
          </Link>
        </li>
        <li>
          <Link to="/add-exercise">
            <span style={ { paddingRight: '10px', fontSize: 16, fontWeight: 600 } }>ADD EXERCISE</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard">
            <span style={ { paddingRight: '10px', fontSize: 16, fontWeight: 600 } }>CLIENTS</span>
          </Link>
        </li>
        <li>
          <Link to="/add">
            <span style={ { paddingRight: '10px', fontSize: 16, fontWeight: 600 } }>ADD A CLIENT</span>
          </Link>
        </li>
        <li><Link onClick={ logout } to="/">
          <span style={ { paddingRight: '10px', fontSize: 16, fontWeight: 600 } }>LOGOUT</span>
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
