import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import Sidebar from '../layout/Sidebar';
import { getExerciseLibrary } from '../../actions/exerciseLibrary';
import SingleExerciseItem from './SingleExerciseItem';
const ShowLibrary = ({ getExerciseLibrary, exerciseLibrary: { exerciseLibraryList, loading }, auth: { isAuthenticated } }) => {
  useEffect(() => {
    getExerciseLibrary();
  }, [getExerciseLibrary, loading]);
  return (
    <Fragment>
      <Sidebar />
      { loading ? (
        <Spinner />
      ) : (
          isAuthenticated &&
          <section className='exercises'>
            <div className="dark-overlay">
              <div className="exercises-container">
                { exerciseLibraryList.length > 0 && (
                  <div className="exercise-headers">
                    <table>
                      <thead>
                        <tr className="head">
                          <th style={ { fontSize: 18 } }>Exercise</th>
                          <th style={ { fontSize: 18 } }>Category</th>
                          <th style={ { fontSize: 18 } }>Video</th>
                          <th style={ { fontSize: 18 } }>Actions</th>
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
        )
      }
    </Fragment >
  );
};
ShowLibrary.propTypes = {
  getExerciseLibrary: PropTypes.func.isRequired,
  exerciseLibrary: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  exerciseLibrary: state.exerciseLibrary,
  auth: state.auth
});

export default connect(mapStateToProps, { getExerciseLibrary })(ShowLibrary);
