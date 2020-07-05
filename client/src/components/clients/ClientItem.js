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
    <div className="clients-card">
      <div className="client-container">
        <div className="client-container header">
          <h2>{ clientFirstName } { !clientLastName ? '' : clientLastName } <span className="client-links">
            <Link to={ `/client/${_id}` } >
              <i className="far fa-eye" style={ { color: '#61c9a8', padding: '1em', fontSize: '13px', marginTop: '-12px' } }></i></Link>
          </span></h2>
        </div>
        <div className="client-container-body">
          <div className="clients-inner">
            { clientPhone ? <span><strong>Phone </strong> { clientPhone } </span> : <span>Phone { 'n/a' }</span> }
            <br />
            { clientEmail ? <span><strong>Email </strong> { clientEmail } </span> : <span>Email { 'n/a' }</span> }
            <br />
            { clientSport ? <span><strong>Sport </strong> { clientSport } </span> : <span>Sport { 'n/a' }</span> }
          </div>
        </div>
      </div>
    </div>
  );
};

ClientItem.propTypes = {
  clientProfile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  clientProfile: state.profile,
});
export default connect(mapStateToProps)(ClientItem);
