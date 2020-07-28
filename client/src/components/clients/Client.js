import React, { useEffect, Fragment, useState } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getClientProfile, deleteClient } from '../../actions/profile';
import ClientEstimates from './ClientEstimates';
import OneRMChart from './OneRMChart';
import ClientNotes from './ClientNotes';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const Client = ({ match, getClientProfile, deleteClient, profile: { clientProfile, loading } }) => {

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    getClientProfile(match.params.id);
  }, [getClientProfile, match.params.id, loading]);

  const onClick = () => {
    deleteClient(clientProfile._id);
    window.location.replace('/dashboard/clients');
  };
  return (
    <section className="client">
      <Fragment>
        { clientProfile === null || loading ? <Spinner /> :
          (<div className="dark-overlay">
            <div className="client-card">
              <div className="client-header">
                <h3>
                  { clientProfile.clientFirstName } { !clientProfile.clientLastName ? '' : clientProfile.clientLastName }
                </h3>
                <span className="client-header-links">
                  <Link href={ `/dashboard/edit/${match.params.id}` } style={ { color: '#61c9a8' } }>
                    <i className="far fa-edit" style={ { color: '#61c9a8', paddingRight: 8 } }></i>
              Edit</Link>
                  <Link href={ `/dashboard/add-rm/${match.params.id}` } style={ { color: '#61c9a8' } }>
                    <i className="far fa-plus-square" style={ { color: '#61c9a8', paddingRight: 8 } }></i>
            Add RM
            </Link>
                  <Link onClick={ handleClickOpen } style={ { color: '#61c9a8' } }>
                    <i className="far fa-trash-alt" style={ { color: '#61c9a8', paddingRight: 8 } } ></i>
                    Delete</Link>
                  <Dialog
                    open={ open }
                    onClose={ handleClose }
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title"
                      style={ { fontSize: 14 } }>{ "Delete client." }</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        This is permanent, do you wish to continue?
          </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={ handleClose } color="secondary">
                        No
          </Button>
                      <Button onClick={ () => onClick() } color="primary" autoFocus>
                        Yes
          </Button>
                    </DialogActions>
                  </Dialog>
                </span>
              </div>
              <p className="client-card-body">
                { clientProfile.clientOneRM.map((rm, idx) =>
                  idx === 0 &&
                  (<span key={ idx } className="elem">
                    Bench Press:  { rm.benchPress } kg
                    <br />
                    Squat:  { rm.squat } kg
                  </span>)
                ) }
              </p>
              <div className="notes">
                <h3 style={ { color: '#61c9a8', fontWeight: 100, paddingBottom: '0.25em', position: 'relative' } }>Notes for { clientProfile.clientFirstName }</h3>
                { clientProfile.notes }
              </div>
              <ClientEstimates clientId={ match.params.id } />
            </div>

            <ClientNotes />
            <OneRMChart clientId={ clientProfile._id } />
          </div>)
        }
      </Fragment>
    </section>
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
