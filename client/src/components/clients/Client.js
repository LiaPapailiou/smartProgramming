import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getClientProfile } from '../../actions/profile';
import EditClientProfile from './EditClientProfile';

const Client = ({ match, getClientProfile, profile: { profile } }) => {

  useEffect(() => {
    getClientProfile(match.params.id);
    console.log(match.params.id);
  }, [getClientProfile]);

  return (
    <div>
      <p>Client</p>
      { match.params.id }
    </div>
  );
};

Client.propTypes = {
  profile: PropTypes.object.isRequired,
  getClientProfile: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getClientProfile })(Client);
