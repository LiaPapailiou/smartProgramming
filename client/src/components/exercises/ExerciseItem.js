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

      <div className="exercise-container-lists">
        <ul>
          <li style={ { color: '#000', padding: '.25em', fontSize: 14 } }> <span><strong>{ exercise }</strong></span> <span>{ min }</span> <span>{ max }</span> </li>
          {/* <Link to={ `/edit-exercise/${_id}` }>
            <i className="far fa-edit" style={ { color: '#61c9a8', paddingRight: 8 } }></i>
              Edit</Link> */}
        </ul>
      </div>
    </Fragment>
  );
};

ExerciseItem.propTypes = {
  exercise: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  exercise: state.exercise
});

export default connect(mapStateToProps)(ExerciseItem);
