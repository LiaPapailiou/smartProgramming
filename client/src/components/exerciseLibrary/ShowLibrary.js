import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getExerciseLibraryPaginated } from '../../actions/exerciseLibrary';
import SingleExerciseItem from './SingleExerciseItem';
import ReactPaginate from 'react-paginate';

const ShowLibrary = ({ getExerciseLibraryPaginated, exerciseLibrary: { exerciseLibraryList, loading, numPages } }) => {
  useEffect(() => {
    getExerciseLibraryPaginated(0);
  }, [getExerciseLibraryPaginated, loading]);

  const handleClick = (e) => {
    getExerciseLibraryPaginated(`${e.selected}`);
  };

  return (
    <Fragment>
      { loading ? (
        <Spinner />
      ) : (

          exerciseLibraryList.length > 0 ?
            (<>
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
              <ReactPaginate
                previousLabel={ 'previous' }
                nextLabel={ 'next' }
                breakLabel={ '...' }
                breakClassName={ 'break-me' }
                pageCount={ numPages }
                marginPagesDisplayed={ 2 }
                pageRangeDisplayed={ 5 }
                onPageChange={ handleClick }
                containerClassName={ 'pagination' }
                subContainerClassName={ 'pages pagination' }
                activeClassName={ 'active' }
              />
            </>
            ) : (<p style={ { color: '#fff', fontSize: 20, marginLeft: 500, marginRight: 'auto', marginTop: 300, position: 'absolute' } }>There are currently no programs. Click <Link to="/dashboard/add-library">here</Link> to add them.</p>)
        )
      }
    </Fragment >
  );
};
ShowLibrary.propTypes = {
  getExerciseLibraryPaginated: PropTypes.func.isRequired,
  exerciseLibrary: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  exerciseLibrary: state.exerciseLibrary,
});

export default connect(mapStateToProps, { getExerciseLibraryPaginated })(ShowLibrary);
