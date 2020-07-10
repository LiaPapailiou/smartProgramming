import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ExerciseItem = ({
  exerciseItem: {
    _id,
    name,
    min,
    max,
    factor
  },
}) => {
  return (
    <Fragment>

      <div className="exercise-container-lists">
        <ul>
          <li style={ { color: '#fff', padding: '.25em', fontSize: 14 } }> <span><strong>{ name }</strong></span> <span>{ min }</span> <span>{ max }</span> </li>
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
