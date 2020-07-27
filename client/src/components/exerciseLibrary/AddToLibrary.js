import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CustomAlert from '../layout/CustomAlert';
import { useHistory } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import { insertSingleExercise } from '../../actions/exerciseLibrary';

const AddToLibrary = ({ insertSingleExercise }) => {
  let history = useHistory();
  const [formData, setFormData] = useState({
    exerciseName: '',
    exerciseCategory: '',
    videoLink: '',
  });
  const { exerciseName, exerciseCategory, videoLink } = formData;
  const onChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    insertSingleExercise(formData);
    setFormData({
      exerciseName: '',
      exerciseCategory: '',
      videoLink: '',
    });
  };
  return (
    <>
      <Sidebar />
      <div className="add">

        <CustomAlert />
        <div className="dark-overlay">
          <div className="add-card" style={ { height: 400 } }>
            <h3 style={ { fontSize: 33, paddingTop: '0.25em', paddingRight: '2.2em', paddingBottom: '0.15em', paddingLeft: 0 } }>Add to Library</h3>
            <div className="add-card-body" style={ { marginTop: '2em', } }>
              <form className="add-form" onSubmit={ (e) => onSubmit(e) }>
                <div className="add-input-group" >
                  <input
                    type="text"
                    className="form-control"
                    name="exerciseName"
                    value={ exerciseName }
                    onChange={ (e) => onChange(e) }
                    placeholder=" Exercise Name"
                    required />
                  <input
                    type="text"
                    className="form-control"
                    name="exerciseCategory"
                    value={ exerciseCategory }
                    onChange={ (e) => onChange(e) }
                    placeholder=" Category"
                    required
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="videoLink"
                    value={ videoLink }
                    onChange={ (e) => onChange(e) }
                    placeholder=" Video Link"
                    required />
                </div>
                <input
                  type="button"
                  className="input-add"
                  onClick={ () => history.push('/exercise-library') }
                  value="Go Back" />
                <input
                  type="submit"
                  className="input-add"
                  value="Add" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

AddToLibrary.propTypes = {
  insertSingleExercise: PropTypes.func.isRequired,
};

export default connect(null, { insertSingleExercise })(AddToLibrary);
