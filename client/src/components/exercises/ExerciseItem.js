import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const ExerciseItem = ({
  exerciseItem: {
    _id,
    exercise,
    min,
    max,
    factor
  },
}) => {
  return (
    <Fragment>

      <tr>
        <td onClick={ () => <Link to={ `/edit-exercise/${_id}` }></Link> }>{ exercise }</td>
        <td>{ min }</td>
        <td>{ max }</td>
      </tr>
    </Fragment>
  );
};

ExerciseItem.propTypes = {
  singleExercise: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  singleExercise: state.exercise
});

export default connect(mapStateToProps)(ExerciseItem);
