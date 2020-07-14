import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getAllProfiles } from '../../actions/profile';
import ClientItem from './ClientItem';

const ShowAllClients = ({ getAllProfiles, profile: { clientProfiles, loading } }) => {

  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles, loading]);

  return (
    <Fragment>
      { loading ? (
        <Spinner />
      ) :
        <div className='clients'>
          { clientProfiles.length > 0 ? (
            <div className="table-wrapper">
              <table className="client-table">
                <thead>
                  <tr>
                    <th style={ { color: '#fff', padding: '1em' } }>Client Name</th>
                    <th style={ { color: '#fff', padding: '1em' } }>Information</th>
                    <th style={ { color: '#fff', padding: '1em' } }>View</th>
                  </tr>
                </thead>
                <tbody >{
                  clientProfiles.map((client) => (
                    <ClientItem key={ client._id } client={ client } />
                  ))
                }
                </tbody>
              </table>
            </div>) : (
              <p style={ { color: '#fff', fontSize: 17 } }>There are currently no clients for this account. Click <Link to='/add'>here </Link> to add clients.</p>
            ) }
        </div>
      }
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
