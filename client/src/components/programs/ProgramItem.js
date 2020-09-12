import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteProgram } from '../../actions/programs';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';


const ProgramItem = ({
  programItem: {
    _id,
    clientName,
    month,
    year
  }, deleteProgram,
}) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onClick = () => {
    deleteProgram(_id);
    window.location.replace('/dashboard/manage');
  };

  return (
    <>
      <tr key={ _id } style={ { textAlign: 'center', marginBottom: '3em', fontSize: 14 } }>
        <td> { clientName } { month } { year }</td>
        <td><i className="fas fa-ban" style={ { color: 'red' } } onClick={ handleClickOpen }></i></td>
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
      </tr>
    </>
  );
};

ProgramItem.propTypes = {
  deleteProgram: PropTypes.func.isRequired,
};


export default connect(null, { deleteProgram })(ProgramItem);
