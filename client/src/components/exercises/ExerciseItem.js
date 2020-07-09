import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

      <div className="exercise-container">
        <table>
          <tr>
            <td style={ { color: '#000', paddingRight: '1em' } }>{ exercise }</td>
            <td style={ { color: '#000', paddingRight: '1em' } }>{ min }</td>
            <td style={ { color: '#000', paddingRight: '1em' } }>{ max }</td>
          </tr>
        </table >
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
