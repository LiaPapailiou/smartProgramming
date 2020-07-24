import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import Sidebar from '../layout/Sidebar';
import { getExerciseLibrary } from '../../actions/exerciseLibrary';
import SingleExerciseItem from './SingleExerciseItem';
const ShowLibrary = ({ getExerciseLibrary, exerciseLibrary: { exerciseLibraryList, loading } }) => {
  useEffect(() => {
    getExerciseLibrary();
  }, [getExerciseLibrary, loading]);
  return (
    <Fragment>
      <Sidebar />
      { loading ? (
        <Spinner />
      ) :
        <section className='exercises'>
          <div className="dark-overlay">
            <div className="exercises-container">
              { exerciseLibraryList.length > 0 && (
                <div className="exercise-headers">
                  <table>
                    <thead>
                      <tr className="head">
                        <th>Exercise Name</th>
                        <th>Exercise Category</th>
                        <th>Video Link</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        exerciseLibraryList.map((singleExercise) => (
                          <SingleExerciseItem key={ singleExercise._id } singleExercise={ singleExercise } />
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
ShowLibrary.propTypes = {
  getExerciseLibrary: PropTypes.func.isRequired,
  exerciseLibrary: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  exerciseLibrary: state.exerciseLibrary,
});

export default connect(mapStateToProps, { getExerciseLibrary })(ShowLibrary);
