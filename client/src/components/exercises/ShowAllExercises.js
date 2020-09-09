import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getExercises } from '../../actions/exercise';
import ExerciseItem from './ExerciseItem';



const ShowAllExercises = ({ getExercises, exercise: { exercises, loading }, auth: { isAuthenticated } }) => {
  useEffect(() => {
    getExercises();
  }, [getExercises, loading]);
  return (
    <Fragment>
      { loading ? (
        <Spinner />
      ) : (isAuthenticated &&

        <div className="exercises-container">
          { exercises.length > 0 && (
            <div className="exercise-headers" >
              <table>
                <thead>
                  <tr className="head">
                    <th>Exercise</th>
                    <th>Min</th>
                    <th>Max</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    exercises.map((exerciseItem) => (
                      <ExerciseItem key={ exerciseItem._id } exerciseItem={ exerciseItem } />
                    ))
                  }
                </tbody>
              </table>
            </div>
          ) }</div>

        )
      }
    </Fragment >
  );
};

ShowAllExercises.propTypes = {
  getExercises: PropTypes.func.isRequired,
  exercise: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  exercise: state.exercises,
  auth: state.auth
});

export default connect(mapStateToProps, { getExercises })(ShowAllExercises);
