import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ShowAllClients from '../clients/ShowAllClients';

const Dashboard = ({ getAllProfiles, profiles: { clientProfiles, loading } }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);
  return (
    <section className="dashboard">
      <div className="dark-overlay">
        <Navbar />

        {
          loading && clientProfiles === []
          &&
          <Spinner />
        }
        {

          clientProfiles !== []
          &&

          <ShowAllClients />
        }
      </div>
    </section>

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
