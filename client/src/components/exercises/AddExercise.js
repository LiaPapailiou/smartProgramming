import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar';
import { insertExercise } from '../../actions/exercise';
const AddExercise = ({ insertExercise, history }) => {
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
    insertExercise(formData, history);
    setFormData({
      exercise: '',
      body: '',
      min: '',
      max: '',
      factor: '',
    });
  };
  return (
    <div className="add-exercise">
      <Navbar />
      <div className="add-exercise-container">
        <div className="add-exercise-card">
          <h2>Add an exercise</h2>
          <form className="add-exercise-form" onSubmit={ (e) => onSubmit(e) } style={ { marginTop: 300 } }>
            <div className="add-exercise-input-group">
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
              type="submit"
              className="input-add"
              value="Add" />
          </form>
        </div>
      </div>
    </div >
  );
};

AddExercise.propTypes = {
  insertExercise: PropTypes.func.isRequired,
};


export default connect(null, { insertExercise })(withRouter(AddExercise));
