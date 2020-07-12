import React, { useEffect, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import Navbar from '../layout/Navbar';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getClientProfile, deleteClient } from '../../actions/profile';
import ClientEstimates from './ClientEstimates';
import OneRMChart from './OneRMChart';
import ClientNotes from './ClientNotes';


const Client = ({ match, getClientProfile, deleteClient, profile: { clientProfile, loading } }) => {



  useEffect(() => {
    getClientProfile(match.params.id);

  }, [getClientProfile, match.params.id]);

  const onClick = () => {
    deleteClient(match.params.id);
    window.history.back();
  };
  return (
    <div className="client">
      <Navbar />
      <Fragment>
        { clientProfile === null || loading ? <Spinner /> :
          (<div className="dark-overlay">
            <div className="client-container">
              <div className="client-details-container">
                <div className="client-card">
                  <div className="client-header">
                    <h3>
                      { clientProfile.clientFirstName }
                    </h3>
                    <span className="client-header-links">
                      <Link to={ `/edit/${match.params.id}` }>
                        <i className="far fa-edit" style={ { color: '#61c9a8', paddingRight: 8 } }></i>
              Edit</Link>
                      <Link to={ `/add-rm/${match.params.id}` }>
                        <i className="far fa-plus-square" style={ { color: '#61c9a8', paddingRight: 8 } }></i>
            Add RM
            </Link>
                      <Link onClick={ () => onClick() }>
                        <i className="far fa-trash-alt" style={ { color: '#61c9a8', paddingRight: 8 } } ></i>Delete
                    </Link>
                    </span>
                  </div>
                  <div className="client-card-body">
                    { clientProfile.clientOneRM.map((rm, idx) =>
                      idx === 0 &&
                      (<span key={ idx } className="elem">
                        Bench Press:  { rm.benchPress } kg
                        <br />
                    Squat:  { rm.squat } kg
                      </span>)
                    ) }
                  </div>
                  <ClientEstimates clientId={ match.params.id } />
                </div>
                <OneRMChart clientId={ match.params.id } />
                <ClientNotes />
                <div style={ { color: '#fff', paddingRight: 8, border: 'solid white 1px', fontSize: 13 } }>
                  <h2 style={ { color: '#61c9a8' } }>notes</h2>
                  { clientProfile.notes }
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
  deleteClient: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getClientProfile, deleteClient })(Client);
