import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getExerciseLibrary } from '../../actions/exerciseLibrary';
import SingleExerciseItem from './SingleExerciseItem';
const ShowLibrary = ({ getExerciseLibrary, exerciseLibrary: { exerciseLibraryList, loading }, auth: { isAuthenticated } }) => {
  useEffect(() => {
    getExerciseLibrary();
  }, [getExerciseLibrary, loading]);
  return (
    <Fragment>
      { loading ? (
        <Spinner />
      ) : (
          isAuthenticated && exerciseLibraryList.length > 0 ?
            (
              <div className="exercises-container">

                <div className="exercise-headers">
                  <table>
                    <thead>
                      <tr className="head">
                        <th style={ { fontSize: 20 } }>Exercise</th>
                        <th style={ { fontSize: 20 } }>Category</th>
                        <th style={ { fontSize: 20 } }>Video</th>
                        <th style={ { fontSize: 20 } }>Actions</th>
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
              </div>
            ) : (<p style={ { color: '#fff', fontSize: 20, marginLeft: 500, marginRight: 'auto', marginTop: 300, position: 'absolute' } }>There are currently no programs. Click <Link to="/dashboard/add-library">here</Link> to add them.</p>)
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
