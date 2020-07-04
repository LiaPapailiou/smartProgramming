import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ClientItem = ({
  client: {
    _id,
    clientFirstName,
    clientLastName,
    clientPhone,
    clientEmail,
    clientSport,
  },
}) => {
  return (
    <div className='profile bg-light'>
      <div className="client-container">
        <h2>{ clientFirstName } { !clientLastName ? '' : clientLastName }</h2>
        <div className="client-inner">
          { clientPhone && <span><strong>Phone </strong> { clientPhone } </span> }
          { clientEmail && <span><strong>Email </strong> { clientEmail } </span> }
          { clientSport && <span><strong>Sport </strong> { clientSport } </span> }
        </div>
        <span className="client-links">
          <Link to={ `/client/${_id}` } >
            <i className="far fa-eye" style={ { color: '#61c9a8', paddingRight: 8 } }></i>View</Link>
          <Link to={ `/edit/${_id}` }>
            <i className="fas fa-user-edit" style={ { color: '#61c9a8', paddingRight: 8 } }></i>
              Edit Profile</Link>
          <Link to={ `/add-rm/${_id}` }>
            <i className="fas fa-weight-hanging" style={ { color: '#61c9a8', paddingRight: 8 } }></i>
            Add new RM
            </Link>
        </span>
      </div>
    </div >
  );
};

ClientItem.propTypes = {
  clientProfile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  clientProfile: state.profile,
});
export default connect(mapStateToProps)(ClientItem);
