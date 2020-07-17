import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { getExerciseById } from '../../actions/exercise';
import Navbar from '../layout/Navbar';

const Exercise = ({ match, getExerciseById, exercise: { exercise, loading } }) => {
  useEffect(() => {
    getExerciseById(match.params.id);
    console.log(match.params.id);
  }, [getExerciseById, match.params.id]);

  return (
    <section className="exercises">
      <Navbar />
      <div className="dark-overlay">
        <Fragment>
          { exercise === null || loading ? <Spinner /> :
            (<div className="exercise-container" style={ { color: '#fff', border: '1px solid #000' } }>
              <span>{ exercise.exercise } { exercise.min }{ exercise.max }</span>
              <Link to={ `/edit-exercise/${match.params.id}` }>
                <i className="far fa-edit" style={ { color: '#61c9a8', paddingRight: 8 } }></i>
              Edit</Link>
            </div>) }
        </Fragment>
      </div>
    </section>
  );
};

Exercise.propTypes = {
  getExerciseById: PropTypes.func.isRequired,
  exercise: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  exercise: state.exercises
});

export default connect(mapStateToProps, { getExerciseById })(Exercise);
