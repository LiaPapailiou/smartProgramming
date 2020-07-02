import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getClientProfile } from '../../actions/profile';

const Client = ({ match, getClientProfile, clientProfile: { profile } }) => {

  useEffect(() => {
    getClientProfile(match.params.id);
    console.log(match.params.id);
  }, [getClientProfile]);

  return (
    <div>
      <p>Client</p>
      { profile ? 'has' : 'no' }
    </div>
  );
};

Client.propTypes = {
  getClientProfile: PropTypes.func.isRequired,
  clientProfile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  clientProfile: state.profile,
});
export default connect(mapStateToProps, { getClientProfile })(Client);
