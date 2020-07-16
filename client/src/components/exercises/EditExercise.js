import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getExerciseById, editExercise } from '../../actions/exercise';
const EditExercise = ({ match, getExerciseById, editExercise, }) => {
  const [formData, setFormData] = useState({
    exercise: '',
    body: '',
    min: '',
    max: '',
    factor: '',
  });

  const { exercise, body, min, max, factor } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    editExercise(formData, exercise._id);
    setFormData({
      exercise: '',
      body: '',
      min: '',
      max: '',
      factor: '',
    });
  };
  const onClick = () => {
    window.history.back();
  };
  useEffect(() => {
    getExerciseById(match.params.id);
    console.log(match.params.id);
    setFormData({
      exercise: loading || !exercise.exercise ? '' : exercise.exercise,
      body: loading || !exercise.body ? '' : exercise.body,
      min: loading || !exercise.min ? '' : exercise.min,
      max: loading || !exercise.max ? '' : exercise.max,
      factor: loading || !exercise.factor ? '' : exercise.factor,
    });
  }, [getExerciseById, match.params.id, loading]);
  return (
    <div className="edit-exercise">
      <div className="edit-exercise-container">
        <div className="edit-exercise-card">
          <h2>Edit</h2>
          <form className="edit-exercise-form" onSubmit={ (e) => onSubmit(e) } style={ { marginTop: 300 } }>
            <div className="edit-exercise-input-group">
              <input
                type="text"
                className="form-control"
                name="exercise"
                value={ exercise }
                onChange={ (e) => onChange(e) }
                placeholder=" Exercise Name"
                required />
              <input
                type="text"
                className="form-control"
                name="body"
                value={ body }
                onChange={ (e) => onChange(e) }
                placeholder=" Squat or Bench"
                required />
              <input
                type="text"
                className="form-control"
                name="min"
                value={ min }
                onChange={ (e) => onChange(e) }
                placeholder=" Coefficient (min)"
                required
              />
              <input
                type="text"
                className="form-control"
                name="max"
                value={ max }
                onChange={ (e) => onChange(e) }
                placeholder=" Coefficient (max)"
                required />
              <input
                type="text"
                className="form-control"
                name="factor"
                value={ factor }
                onChange={ (e) => onChange(e) }
                placeholder=" true or false"
                required />
            </div>
            <input
              type="button"
              className="input-add"
              onClick={ () => onClick() }
              value="Go Back" />
            <input
              type="submit"
              className="input-edit"
              value="Edit" />
          </form>
        </div>
      </div>
    </div >
  );
};

EditExercise.propTypes = {
  getExerciseById: PropTypes.func.isRequired,
  editExercise: PropTypes.func.isRequired,
  exercise: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  exercise: state.exercise
});
export default connect(mapStateToProps, { getExerciseById, editExercise })(EditExercise);
