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
    <div className="add">
      <Navbar />
      <div className="dark-overlay">
        <div className="add-card" style={ { height: 480 } }>
          <h3 style={ { fontSize: 33, paddingTop: '0.25em', paddingRight: '2.2em', paddingBottom: '0.15em', paddingLeft: 0 } }>Add an exercise</h3>
          <div className="add-card-body" style={ { marginTop: '2em', } }>
            <form className="add-form" onSubmit={ (e) => onSubmit(e) }>
              <div className="add-input-group" >
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
                  placeholder=" true / false"
                  required />
              </div>
              <input
                type="submit"
                className="input-add"
                value="Add" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

AddExercise.propTypes = {
  insertExercise: PropTypes.func.isRequired,
};


export default connect(null, { insertExercise })(withRouter(AddExercise));