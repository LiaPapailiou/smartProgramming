import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CustomAlert from '../layout/CustomAlert';
import { useHistory } from 'react-router-dom';
import { getSingleExercise, editSingleExercise } from '../../actions/exerciseLibrary';
import Spinner from '../layout/Spinner';

const EditLibrary = ({ match, getSingleExercise, editSingleExercise, exercise: { singleExercise, loading } }) => {
  let history = useHistory();
  const [formData, setFormData] = useState({
    exerciseName: '',
    exerciseCategory: '',
    videoLink: ''
  });
  const { exerciseName, exerciseCategory, videoLink } = formData;

  const onChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    editSingleExercise(formData, match.params.id);
    setFormData({
      exerciseName: '',
      exerciseCategory: '',
      videoLink: ''
    });
  };
  useEffect(() => {
    getSingleExercise(match.params.id);
    setFormData({
      exerciseName: loading || !singleExercise.exerciseName ? '' : singleExercise.exerciseName,
      exerciseCategory: loading || !singleExercise.exerciseCategory ? '' : singleExercise.exerciseCategory,
      videoLink: loading || !singleExercise.videoLink ? '' : singleExercise.videoLink,
    });
  }, [getSingleExercise, match.params.id, loading]);
  const onClick = () => {
    history.push('/dashboard/exercise-library');
  };
  return (
    <>

      <CustomAlert />
      { singleExercise === null || loading ?
        <Spinner /> :
        (
          <div className="add-card" style={ { minHeight: '35vh', maxHeight: '45vh', maxWidth: '33vw' } }>
            <h3 style={ { fontSize: 22, paddingTop: '0.25em', paddingRight: '100px', paddingLeft: '0.7em', height: '6vh', marginBottom: '20px' } }>Edit Library</h3>
            <div className="add-card-body">
              <form className="add-form" onSubmit={ (e) => onSubmit(e) } style={ { marginTop: '2em', } }>
                <div className="add-input-group">
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
                <div style={ { marginBottom: 15 } }>
                  <input
                    type="button"
                    className="input-add"
                    onClick={ () => onClick() }
                    value="Go Back" />
                  <input
                    type="submit"
                    className="input-add"
                    value="Edit" />
                </div>
              </form>
            </div>
          </div>
        ) }

    </>
  );
};

EditLibrary.propTypes = {
  getSingleExercise: PropTypes.func.isRequired,
  editSingleExercise: PropTypes.func.isRequired,
  exercise: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  exercise: state.exerciseLibrary
});
export default connect(mapStateToProps, { getSingleExercise, editSingleExercise })(EditLibrary);
