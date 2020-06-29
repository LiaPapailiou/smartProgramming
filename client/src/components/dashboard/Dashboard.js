import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';

const Dashboard = (props) => {
  return (
    <div>
      <Navbar />
      <div className="dash-container">
        <h2>Clients</h2>
      </div>
    </div>
  );
};

Dashboard.propTypes = {

};

export default Dashboard;
