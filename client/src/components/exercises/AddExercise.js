import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { insertExercise } from '../../actions/exercise';
import CustomAlert from '../layout/CustomAlert';
import { useHistory } from 'react-router-dom';


const AddExercise = ({ insertExercise }) => {
  let history = useHistory();
  const [formData, setFormData] = useState({
    exercise: '',
    body: '',
    min: '',
    max: '',
    factor: '',
  });

  const { exercise, body, min, max, factor } = formData;
  const onChange = (e) => {
    const value = e.target.value;
    if (value === "true" || value === "false")
      JSON.parse(value);
    setFormData({ ...formData, [e.target.name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    insertExercise(formData);
    setFormData({
      exercise: '',
      body: '',
      min: '',
      max: '',
      factor: '',
    });
  };

  return (
    <>
      <CustomAlert />
      <div className="add-card" style={ { height: '60vh', width: '38vw' } }>
        <h3 style={ {
          fontSize: 22, paddingTop: '0.25em', paddingRight: '2.2em', paddingBottom: '0.35em', paddingLeft: '0.7em', height: '6vh',
          marginBottom: '20px'
        } }>Add an exercise</h3>
        <div className="add-card-body">
          <form className="add-form" onSubmit={ (e) => onSubmit(e) } style={ { marginTop: '2em', } }>
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
              <div className="add-select">
                <label >
                  <select
                    type="text"
                    className="form-control"
                    name="body"
                    value={ body }
                    onChange={ (e) => onChange(e) }
                    style={ { color: '#000', fontSize: 14, marginTop: 5, padding: '0.10em', borderRadius: '0.3em' } }
                    required>
                    <option value="">One RM</option>
                    <option value="Bench">Bench Press</option>
                    <option value="Squat">Squat</option>
                    <option value="None">None</option>
                  </select>
                  <select
                    type="text"
                    className="form-control"
                    name="factor"
                    value={ factor }
                    onChange={ (e) => onChange(e) }
                    style={ { color: '#000', fontSize: 14, marginTop: 5, padding: '0.10em', borderRadius: '0.3em' } }
                    required>
                    <option value="">Level</option>
                    <option value="true">Applicable</option>
                    <option value="false">Not Applicable</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="lib-buttons">
              <input
                type="button"
                className="input-add"
                onClick={ () => history.push('/dashboard/exercises') }
                value="Go Back" />
              <input
                type="submit"
                className="input-add"
                value="Add" />
            </div>
          </form>
        </div>
      </div>
      {/* </Modal> */ }
    </>
  );
};

AddExercise.propTypes = {
  insertExercise: PropTypes.func.isRequired,
};

export default connect(null, { insertExercise })(AddExercise);
