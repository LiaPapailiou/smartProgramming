import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';


const Navbar = ({ logout }) => {
  const [visible, setVisible] = useState(false);
  const onClick = () => setVisible(!visible);

  return (
    <nav className="navbar">
      <ul style={ { color: '#fff', height: 120 } } onClick={ onClick }> Menu
      { visible ?
          <div className="sublist" style={ { fontSize: 15, color: '#fff', textAlign: 'left' } }>
            <li><Link to="/exercises" rel="noopener noreferrer">Exercises</Link></li>
            <li> <Link to="/add-exercise" rel="noopener noreferrer">Add Exercise</Link></li>
            <li><Link to="/dashboard" rel="noopener noreferrer">Clients</Link></li>
            <li><Link to="/add" rel="noopener noreferrer">Add Client</Link></li>
            <li><Link onClick={ logout } to="/" rel="noopener noreferrer">Logout</Link></li>
          </div> : null }
      </ul>
    </nav >
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Navbar);
