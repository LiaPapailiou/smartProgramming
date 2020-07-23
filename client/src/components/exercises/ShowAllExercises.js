import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getExercises } from '../../actions/exercise';
import ExerciseItem from './ExerciseItem';
import Navbar from '../layout/Navbar';



const ShowAllExercises = ({ getExercises, exercise: { exercises, loading }, isAuthenticated }) => {
  useEffect(() => {
    getExercises();
  }, [getExercises, loading]);
  return (
    <Fragment>
      <Navbar />
      { loading ? (
        <Spinner />
      ) :
        <section className='exercises'>

          <div className="dark-overlay">

            <div className="exercises-container">
              { exercises.length > 0 && (
                <div className="exercise-headers">
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
          </div>
        </section>
      }
    </Fragment >
  );
};

ShowAllExercises.propTypes = {
  getExercises: PropTypes.func.isRequired,
  exercise: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  exercise: state.exercises,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getExercises })(ShowAllExercises);
