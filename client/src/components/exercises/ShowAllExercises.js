import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getExercisesPaginated } from '../../actions/exercise';
import ExerciseItem from './ExerciseItem';
import ReactPaginate from 'react-paginate';


const ShowAllExercises = ({ getExercisesPaginated, exercise: { exercises, loading, numPages } }) => {
  useEffect(() => {
    getExercisesPaginated(0);
  }, [getExercisesPaginated, loading]);

  const handleClick = (e) => {
    getExercisesPaginated(`${e.selected}`);
  };

  return (
    <Fragment>
      { loading ? (
        <Spinner />
      ) : (
          exercises.length > 0 ?
            (
              <>
                <div className="exercises-container">
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
            ) : (<p style={ { color: '#fff', fontSize: 20, marginLeft: 500, marginRight: 'auto', marginTop: 300, position: 'absolute' } }>There are currently no programs. Click <Link to="/dashboard/add-exercise">here</Link> to add them.</p>)

        )
      }
    </Fragment >
  );
};

ShowAllExercises.propTypes = {
  getExercisesPaginated: PropTypes.func.isRequired,
  exercise: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  exercise: state.exercises,
});

export default connect(mapStateToProps, { getExercisesPaginated })(ShowAllExercises);
