import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
const Navbar = ({ logout }) => {

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/index"><i className="fas fa-dumbbell" style={ { color: '#717568' } }></i> Smart Programming</Link>
      </h1>
      <ul>
        <li><Link to="/add">Add a client</Link></li>
        <li><Link onClick={ logout } to="/">
          <i className="fas fa-sign-out-alt" style={ { color: '#fff' } }></i>
          <span className="hide-sm">Logout</span>
        </Link></li>
      </ul>
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Navbar);
