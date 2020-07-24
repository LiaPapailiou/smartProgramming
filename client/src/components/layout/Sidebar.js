import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Link from '@material-ui/core/Link';
// import List from '@material-ui/core/List';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const Sidebar = ({ logout }) => {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Toolbar className="toolbar">
        <IconButton
          style={ { color: '#fff' } }
          aria-label="open drawer"
          onClick={ handleDrawerOpen }
          edge="start"
          className="sider-button"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer
        className="drawer"
        style={ { backgroundColor: 'transparent' } }
        variant="persistent"
        anchor="left"
        open={ open }
      >
        <div className="drawer-header">
          <IconButton onClick={ handleDrawerClose }>
            { open === true ? <ChevronLeftIcon /> : <ChevronRightIcon /> }
          </IconButton>
        </div>
        <MenuList>
          <MenuItem><Link href='/exercises'>Exercise List</Link></MenuItem>
          <MenuItem><Link href='/add-exercise'>Add Exercise</Link> </MenuItem>
          <MenuItem><Link href='/dashboard'>Client List</Link></MenuItem>
          <MenuItem><Link href='/add'>Intake Form</Link></MenuItem>
          <MenuItem><Link onClick={ logout } href="/">Logout</Link></MenuItem>
        </MenuList>
      </Drawer>

    </div>
  );
};

Sidebar.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Sidebar);
