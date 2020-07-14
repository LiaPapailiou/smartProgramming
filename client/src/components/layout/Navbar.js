import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ logout }) => {


  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/exercises">
            <span>EXERCISE LIST</span>
          </Link>
        </li>
        <li>
          <Link to="/add-exercise">
            <span>ADD EXERCISE</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard">
            <span>CLIENTS</span>
          </Link>
        </li>
        <li>
          <Link to="/add">
            <span>ADD A CLIENT</span>
          </Link>
        </li>
        <li><Link onClick={ logout } to="/">
          <span>LOGOUT</span>
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
