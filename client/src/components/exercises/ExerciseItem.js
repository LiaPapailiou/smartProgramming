import React, { Fragment } from 'react';
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

      <tr>
        <td>{ exercise }</td>
        <td>{ min }</td>
        <td>{ max }</td>
      </tr>
    </Fragment>
  );
};

export default connect(null)(ExerciseItem);
