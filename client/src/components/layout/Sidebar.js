import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { StylesProvider } from "@material-ui/core/styles";

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
      <StylesProvider injectFirst>
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
            <MenuItem><Link href='/exercises' style={ { color: '#535252', textDecoration: 'none', fontSize: 18, fontWeight: 500, padding: '0.5em' } }>Exercise List</Link></MenuItem>
            <MenuItem><Link href='/add-exercise' style={ { color: '#535252', textDecoration: 'none', fontSize: 18, fontWeight: 500, padding: '0.5em' } } >Add Exercise</Link> </MenuItem>
            <MenuItem><Link href='/dashboard' style={ { color: '#535252', textDecoration: 'none', fontSize: 18, fontWeight: 500, padding: '0.5em' } }>Client List</Link></MenuItem>
            <MenuItem><Link href='/add' style={ { color: '#535252', textDecoration: 'none', fontSize: 18, fontWeight: 500, padding: '0.5em' } }>Intake Form</Link></MenuItem>
            <MenuItem><Link onClick={ logout } href="/" style={ { color: '#535252', textDecoration: 'none', fontSize: 18, fontWeight: 500, padding: '0.5em' } }>Logout</Link></MenuItem>
          </MenuList>
        </Drawer>
      </StylesProvider>
    </div>
  );
};

Sidebar.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Sidebar);
