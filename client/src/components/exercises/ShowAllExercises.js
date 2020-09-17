import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getExercises } from '../../actions/exercise';
import ExerciseItem from './ExerciseItem';



const ShowAllExercises = ({ getExercises, exercise: { exercises, loading } }) => {
  useEffect(() => {
    getExercises();
  }, [getExercises, loading]);
  return (
    <Fragment>
      { loading ? (
        <Spinner />
      ) : (
          exercises.length > 0 ?
            (<div className="exercises-container">
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
            </div>) : (<p style={ { color: '#fff', fontSize: 20, marginLeft: 500, marginRight: 'auto', marginTop: 300, position: 'absolute' } }>There are currently no programs. Click <Link to="/dashboard/add-exercise">here</Link> to add them.</p>)

        )
      }
    </Fragment >
  );
};

ShowAllExercises.propTypes = {
  getExercises: PropTypes.func.isRequired,
  exercise: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  exercise: state.exercises,
});

export default connect(mapStateToProps, { getExercises })(ShowAllExercises);
