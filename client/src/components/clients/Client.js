import React, { useEffect, Fragment, useState } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getClientProfile, deleteClient, getClientPrograms } from '../../actions/profile';
import OneRMChart from './OneRMChart';
import ClientNotes from './ClientNotes';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const Client = ({ match, getClientProfile, deleteClient, getClientPrograms, profile: { clientProfile, loading } }) => {

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    getClientProfile(match.params.id);
    getClientPrograms(match.params.id);
  }, [getClientProfile, getClientPrograms, match.params.id, loading]);

  const onClick = () => {
    deleteClient(clientProfile._id);
    window.location.replace('/dashboard/clients');
  };

  return (
    <Fragment>
      { !clientProfile || loading ? <Spinner /> :
        (<>
          <div className="client-card">
            <ClientNotes />
            <div className="client-header">
              <h3 style={ { alignSelf: 'center' } }>
                { clientProfile.clientFirstName } { !clientProfile.clientLastName ? '' : clientProfile.clientLastName }
              </h3>
              <span className="client-header-links">
                <Link href={ `/dashboard/edit/${match.params.id}` } style={ { color: '#61c9a8' } }>
                  <i className="fas fa-edit" style={ { color: '#61c9a8', paddingRight: 8 } }></i>
              Edit</Link>
                <Link href={ `/dashboard/add-rm/${match.params.id}` } style={ { color: '#61c9a8' } }>
                  <i className="fas fa-plus-square" style={ { color: '#61c9a8', paddingRight: 8 } }></i>
            Add RM
            </Link>
                <Link href={ `/dashboard/add-weight/${match.params.id}` } style={ { color: '#61c9a8' } }>
                  <i className="fas fa-plus-square" style={ { color: '#61c9a8', paddingRight: 8 } }></i>
            Add Weight
            </Link>
                <Link href={ `/dashboard/get-programs/${match.params.id}` } style={ { color: '#61c9a8' } }>
                  <i className="fas fa-plus-square" style={ { color: '#61c9a8', paddingRight: 8 } }></i>
            Get Programs
            </Link>
                <Link onClick={ handleClickOpen } style={ { color: '#61c9a8', fontSize: 14, fontWeight: 500 } }>
                  <i className="fas fa-trash-alt" style={ { color: '#61c9a8', paddingRight: 8 } } ></i>
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
            <h3 style={ { color: '#61c9a8', fontWeight: 100, paddingBottom: '0.25em', position: 'relative', fontSize: 14, marginLeft: -420 } }>Notes for { clientProfile.clientFirstName }</h3>
            <div className="notes">

              { clientProfile.notes }
            </div>
            <OneRMChart clientId={ clientProfile._id } />

          </div>

        </>)
      }
    </Fragment>
  );
};

Client.propTypes = {
  getClientProfile: PropTypes.func.isRequired,
  getClientPrograms: PropTypes.func.isRequired,
  deleteClient: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getClientProfile, deleteClient, getClientPrograms })(Client);
