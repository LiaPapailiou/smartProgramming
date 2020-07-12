import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getExercises } from '../../actions/exercise';
import ExerciseItem from './ExerciseItem';


const ShowAllExercises = ({ getExercises, exercise: { exercises, loading } }) => {
  useEffect(() => {
    getExercises();
  }, [getExercises]);
  return (
    <Fragment>
      { loading ? (
        <Spinner />
      ) :

        <div className='exercises'>
          { exercises.length > 0 ? (
            <div className="exercise-headers">
              <table>
                <thead>
                  <tr className="head">
                    <th>Exercise</th>
                    <th>Min</th>
                    <th>Max</th>
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
          ) : (
              <h4>No exercises found...</h4>
            ) }
        </div>



      }
    </Fragment >
  );
};

ShowAllExercises.propTypes = {
  getExercises: PropTypes.func.isRequired,
  exercise: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  exercise: state.exercise,
});

export default connect(mapStateToProps, { getExercises })(ShowAllExercises);
