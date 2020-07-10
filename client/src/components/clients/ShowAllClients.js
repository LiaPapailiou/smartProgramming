import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getAllProfiles } from '../../actions/profile';
import ClientItem from './ClientItem';

const ShowAllClients = ({ getAllProfiles, profile: { clientProfiles, loading } }) => {

  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);
  return (
    <Fragment>
      { loading ? (
        <Spinner />
      ) : (

          <div className='clients'>

            { clientProfiles.length > 0 ? (
              clientProfiles.map((client) => (
                <ClientItem key={ client._id } client={ client } />
              ))
            ) : (
                <h4 style={ { color: '#fff', fontSize: 18 } }>No clients found. Please add a client...</h4>
              ) }
          </div>


        ) }
    </Fragment>
  );
};

ShowAllClients.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getAllProfiles })(ShowAllClients);
