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
        <td style={ { color: '#fff', padding: '1em', fontSize: 13 } }> { clientFirstName } { clientLastName } </td>
        <td style={ { color: '#fff', padding: '1em', fontSize: 13 } }>
          { clientPhone ? <span><strong>Phone </strong> { clientPhone } </span> : <span>{ '' }</span> }
          <br />
          { clientEmail ? <span><strong>Email </strong> { clientEmail } </span> : <span>{ '' }</span> }
          <br />
          { clientSport ? <span><strong>Sport </strong> { clientSport } </span> : <span>{ '' }</span> }
          <br />
        </td>
        <td style={ { paddingLeft: '1em' } }> <span className="client-links">
          <Link to={ `/client/${_id}` } >
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
