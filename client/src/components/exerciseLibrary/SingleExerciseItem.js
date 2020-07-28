import React, { Fragment, useState } from 'react';
import { deleteSingleExercise } from '../../actions/exerciseLibrary';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CustomAlert from '../layout/CustomAlert';


const SingleExerciseItem = ({
  singleExercise: {
    _id,
    exerciseName,
    exerciseCategory,
    videoLink,
  },
  deleteSingleExercise,
}) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClick = () => {
    deleteSingleExercise(_id);
  };
  return (
    <Fragment>
      <CustomAlert />
      <tr>
        <td>{ exerciseName }</td>
        <td>{ exerciseCategory }</td>
        <td><Link rel="noopener noreferrer" href={ videoLink } target="_blank"><i className="fab fa-youtube" style={ { color: '#f22727' } }></i></Link></td>
        <td>
          <Link href={ `/dashboard/edit-library/${_id}` } style={ { color: '#9cabb8' } }>Edit</Link>{ ' ' }
          <Link onClick={ handleClickOpen } style={ { color: '#9cabb8' } }>Remove</Link>
          <Dialog
            open={ open }
            onClose={ handleClose }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title"
              style={ { fontSize: 14 } }>{ "Remove exercise." }</DialogTitle>
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
        </td>
      </tr>
    </Fragment>
  );
};

SingleExerciseItem.propTypes = {
  deleteSingleExercise: PropTypes.func.isRequired,
};

export default connect(null, { deleteSingleExercise })(SingleExerciseItem);
