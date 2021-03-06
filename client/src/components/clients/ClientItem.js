import React, { Fragment } from 'react';
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
    <Fragment>
      <tr>
        <td style={ { color: '#fff', padding: '1em', fontSize: 15, textAlign: 'left', fontWeight: 300 } }> { clientFirstName } { clientLastName } </td>
        <td style={ { color: '#fff', padding: '1em', fontSize: 15, textAlign: 'justify', fontWeight: 300 } }>
          { clientPhone ? <span><strong>Phone </strong> { clientPhone } </span> : <span>{ '' }</span> }
          <br />
          { clientEmail ? <span><strong>Email </strong> { clientEmail } </span> : <span>{ '' }</span> }
          <br />
          { clientSport ? <span><strong>Sport </strong> { clientSport } </span> : <span>{ '' }</span> }
          <br />
        </td>
        <td style={ { paddingLeft: '1em', textAlign: 'center' } }> <span className="client-links">
          <Link to={ `/dashboard/client/${_id}` } >
            <i className="far fa-eye" style={ { color: '#61c9a8', padding: '1em', fontSize: '13px', marginTop: '-12px' } }></i></Link>
        </span></td>
      </tr>
    </Fragment>




  );
};

ClientItem.propTypes = {
  clientProfile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  clientProfile: state.profile,
});
export default connect(mapStateToProps)(ClientItem);
