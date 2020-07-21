import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getExerciseById, editExercise } from '../../actions/exercise';
import Navbar from '../layout/Navbar';
import CustomAlert from '../layout/CustomAlert';
import { useHistory } from 'react-router-dom';

const EditExercise = ({ match, getExerciseById, editExercise, exercise: { _id } }) => {
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
    editExercise(formData, _id);
    setFormData({
      exercise: '',
      body: '',
      min: '',
      max: '',
      factor: '',
    });
  };

  useEffect(() => {
    getExerciseById(match.params.id);
  }, [getExerciseById, match.params.id]);


  const onClick = () => {
    history.push('/exercises');
  };
  return (
    <div className="add">
      <Navbar />
      <CustomAlert />
      <div className="dark-overlay">
        <div className="add-card" style={ { height: 500 } }>
          <h3 style={ { fontSize: 33, paddingTop: '0.25em', paddingRight: '120px' } }>Edit Exercise</h3>
          <div className="add-card-body">
            <form className="add-form" onSubmit={ (e) => onSubmit(e) } >
              <div className="add-input-group">
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
              <input
                type="button"
                className="input-add"
                onClick={ () => onClick() }
                value="Go Back" />
              <input
                type="submit"
                className="input-add"
                value="Edit" />
            </form>
          </div>
        </div>
      </div >
    </div>
  );
};

EditExercise.propTypes = {
  getExerciseById: PropTypes.func.isRequired,
  editExercise: PropTypes.func.isRequired,
  exercise: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  exercise: state.exercises
});
export default connect(mapStateToProps, { getExerciseById, editExercise })(EditExercise);
