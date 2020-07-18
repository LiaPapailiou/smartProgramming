import React, { Fragment, useState } from 'react';
import { deleteExercise } from '../../actions/exercise';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ExerciseItem = ({
  exerciseItem: {
    _id,
    exercise,
    min,
    max,
    factor
  },
  deleteExercise
}) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClick = () => {
    deleteExercise(_id);
    window.location.reload();
  };

  return (
    <Fragment>

      <tr>
        <td>{ exercise }</td>
        <td>{ min }</td>
        <td>{ max }</td>
        <td><Link href={ `/edit-exercise/${_id}` } style={ { color: '#9cabb8' } }>Edit</Link> { '' }
          <Link onClick={ handleClickOpen } style={ { color: '#9cabb8' } }>Remove</Link>
          <Dialog
            open={ open }
            onClose={ handleClose }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{ "Remove exercise." }</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This is permanent, do you wish to continue?
          </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={ handleClose } color="primary">
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

ExerciseItem.propTypes = {
  deleteExercise: PropTypes.func.isRequired,
};
export default connect(null, { deleteExercise })(ExerciseItem);
