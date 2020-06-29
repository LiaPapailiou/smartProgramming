import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profile';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const Dashboard = ({ getAllProfiles, profiles: { clientProfiles, loading } }) => {
  useEffect(() => {
    getAllProfiles();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="dash-container">
        {
          loading && clientProfiles === []
            ?
            <Spinner />
            :
            <Fragment>
              <h1 className="large text-primary">Clients</h1>
            </Fragment>
        }
        {
          clientProfiles !== []
            ?
            <Fragment>
              has
            </Fragment>
            :
            <Fragment>
              <p>There are currently no clients for this account.</p>
              <Link to='/add' className="btn btn-primary">Click here to add clients.</Link>
            </Fragment>
        }
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profiles: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profiles: state.profile,
});

export default connect(mapStateToProps, { getAllProfiles })(Dashboard);
