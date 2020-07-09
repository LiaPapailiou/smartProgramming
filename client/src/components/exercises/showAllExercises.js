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
      ) : (

          <div className='exercises' style={ { border: '1px solid  black' } }>
            { exercises.length > 0 ? (
              <div className="exercise-headers">
                <span style={ { paddingRight: '1em', fontSize: 20, backgroundColor: 'lightgrey' } }>Exercise</span>
                <span style={ { paddingRight: '1em', fontSize: 20, backgroundColor: 'lightgrey' } }>Min</span>
                <span style={ { paddingRight: '1em', fontSize: 20, backgroundColor: 'lightgrey' } }>Max</span>
                {
                  exercises.map((exerciseItem) => (
                    <ExerciseItem key={ exerciseItem._id } exerciseItem={ exerciseItem } />
                  ))
                }
              </div>
            ) : (
                <h4>No exercises found...</h4>
              ) }
          </div>


        ) }
    </Fragment>
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
