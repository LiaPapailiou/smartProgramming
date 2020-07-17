import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { deleteExercise } from '../../actions/exercise';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


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
        <td><Link to={ `/edit-exercise/${_id}` }>Edit</Link> { '' }
          <Link onClick={ () => onClick() }>Remove</Link></td>
      </tr>
    </Fragment>
  );
};

ExerciseItem.propTypes = {
  deleteExercise: PropTypes.func.isRequired,
};
export default connect(null, { deleteExercise })(ExerciseItem);
