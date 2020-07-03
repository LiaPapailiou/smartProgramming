import React, { useEffect, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import Navbar from '../layout/Navbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getClientProfile } from '../../actions/profile';


const Client = ({ match, getClientProfile, profile: { clientProfile, loading } }) => {



  useEffect(() => {
    getClientProfile(match.params.id);
    console.log(match.params.id);
  }, [getClientProfile, match.params.id]);

  return (
    <div>
      <Navbar />
      <Fragment>
        { clientProfile === null || loading ? <Spinner /> :
          (<div className="client-details-container">
            <h2>
              { clientProfile.clientFirstName }
            </h2>
            { clientProfile.clientOneRM.map((rm) =>
              <span>
                Bench Press One RM { rm.benchPress }
                <br />
               Squat One RM { rm.squat }
              </span>
            ) }</div>) }
      </Fragment>
    </div>
  );
};

Client.propTypes = {
  getClientProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getClientProfile })(Client);
