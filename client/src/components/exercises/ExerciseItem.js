import React, { Fragment } from 'react';
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
        <td><Link to={ `/edit-exercise/${_id}` }>Edit</Link></td>
      </tr>
    </Fragment>
  );
};

export default ExerciseItem;
