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
        <td>{ exercise }</td>
        <td>{ min }</td>
        <td>{ max }</td>
        <td style={ { paddingLeft: '1em' } }> <span className="client-links">
          <Link to={ `/edit-exercise/${_id}` } >
            <i className="far fa-eye" style={ { color: '#61c9a8', padding: '1em', fontSize: '13px', marginTop: '-12px' } }></i></Link>
        </span></td>
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
