import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ logout }) => {
  const menu = (
    <Menu>
      <Menu.Item key='0'>
        <Link to="/exercises" rel="noopener noreferrer">Exercise List</Link>
      </Menu.Item>
      <Menu.Item key='1'>
        <Link to="/add-exercise" rel="noopener noreferrer">Add Exercise</Link>
      </Menu.Item>
      <Menu.Item key='2'>
        <Link to="/edit-exercise" rel="noopener noreferrer">Edit Exercise</Link>
      </Menu.Item>
      <Menu.Item key='3'>
        <Link to="/dashboard" rel="noopener noreferrer">Clients</Link>
      </Menu.Item>
      <Menu.Item key='4'>
        <Link to="/add" rel="noopener noreferrer">Add Client</Link>
      </Menu.Item>
      <Menu.Item key='5'>
        <Link onClick={ logout } to="/" rel="noopener noreferrer">Logout</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="navbar">
      <Dropdown overlay={ menu } trigger={ ['click'] } className="dd-menu">
        <Link className="dd-link" onClick={ (e) => {
          e.preventDefault();
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        } }>Menu</Link>
      </Dropdown>
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Navbar);
