import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getAllProfilesPaginated } from '../../actions/profile';
import ClientItem from './ClientItem';
import ReactPaginate from 'react-paginate';

const ShowAllClients = ({ getAllProfilesPaginated, profile: { clientProfiles, loading, numPages } }) => {

  useEffect(() => {
    getAllProfilesPaginated();
  }, [getAllProfilesPaginated, loading]);

  const handleClick = (e) => {
    getAllProfilesPaginated(`${e.selected}`);
  };

  return (
    <Fragment>
      { !clientProfiles || loading ? (
        <Spinner />
      ) : (
          clientProfiles !== []
          &&
          <>
            <div className='clients'>
              { clientProfiles.length > 0 ? (
                <div className="table-wrapper">
                  <table className="client-table">
                    <thead>
                      <tr>
                        <th style={ { color: '#93aabd', padding: '1em', backgroundColor: '#00000080', fontSize: 18, fontWeight: 300 } }>Client Name</th>
                        <th style={ { color: '#93aabd', padding: '1em', backgroundColor: '#00000080', fontSize: 18, fontWeight: 30 } }>Client Information</th>
                        <th style={ { color: '#93aabd', padding: '1em', backgroundColor: '#00000080', fontSize: 18, fontWeight: 30 } }>View Client</th>
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
                  <p style={ { color: '#fff', fontSize: 20 } }>There are currently no clients for this account. Click <Link to='/dashboard/add'>here </Link> to add clients.</p>
                ) }
            </div>
            <ReactPaginate
              previousLabel={ 'previous' }
              nextLabel={ 'next' }
              breakLabel={ '...' }
              breakClassName={ 'break-me' }
              pageCount={ numPages }
              marginPagesDisplayed={ 2 }
              pageRangeDisplayed={ 5 }
              onPageChange={ handleClick }
              containerClassName={ 'pagination' }
              subContainerClassName={ 'pages pagination' }
              activeClassName={ 'active' }
            />
          </>
        )
      }
    </Fragment >
  );
};

ShowAllClients.propTypes = {
  getAllProfilesPaginated: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getAllProfilesPaginated })(ShowAllClients);
