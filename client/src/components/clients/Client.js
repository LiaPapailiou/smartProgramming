import React, { useEffect, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import Navbar from '../layout/Navbar';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getClientProfile } from '../../actions/profile';


const Client = ({ match, getClientProfile, profile: { clientProfile, loading } }) => {



  useEffect(() => {
    getClientProfile(match.params.id);
    console.log(match.params.id);
  }, [getClientProfile, match.params.id]);

  return (
    <div className="client">
      <Navbar />
      <Fragment>
        { clientProfile === null || loading ? <Spinner /> :
          (<div className="dark-overlay">
            <div className="client-details-container">
              <div className="client-card">
                <div className="client-header">
                  <h3>
                    { clientProfile.clientFirstName }
                  </h3>
                  <span className="client-header-links">
                    <Link to={ `/edit/${match.params.id}` }>
                      <i className="fas fa-user-edit" style={ { color: '#61c9a8', paddingRight: 8 } }></i>
              Edit Profile</Link>
                    <Link to={ `/add-rm/${match.params.id}` }>
                      <i className="fas fa-weight-hanging" style={ { color: '#61c9a8', paddingRight: 8 } }></i>
            Add new RM
            </Link>
                  </span>
                </div>
                <div className="client-card-body">
                  { clientProfile.clientOneRM.map((rm, idx) =>
                    idx === 0 &&
                    (<span key={ idx } className="elem">
                      Current Bench Press 1RM: { rm.benchPress }
                      <br />
                        Current Squat 1RM: { rm.squat }
                    </span>)
                  ) }
                </div>
              </div>
            </div>
          </div>)
        }
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
