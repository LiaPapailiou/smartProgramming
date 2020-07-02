import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';


const DashboardActions = () => {


  return (
    <div className="action-buttons">
      <Link to={ `/edit/${id}` } className="btn btn-light">
        <i className="fas fa-user-edit" style={ { color: '#93aabd' } }></i>Edit Profile</Link>
      <br />
      <Link to={ `/add-rm/${id}` } className="btn btn-light">
        <i className="fas fa-weight-hanging" style={ { color: '#93aabd' } }></i>Add new RM</Link>
    </div>
  );
};

export default DashboardActions;
