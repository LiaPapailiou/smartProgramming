import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEstimates, getClientProfile } from '../../actions/profile';
import ExerciseItem from '../exercises/ExerciseItem';



const ClientEstimates = ({ clientId, getClientProfile, getEstimates, profile: { clientProfile, exerciseList } }) => {
  const [formData, setFormData] = useState({ level: '' });

  const { level } = formData;

  useEffect(() => {
    getClientProfile(clientId);
  }, [getClientProfile]);


  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    getEstimates(formData, clientProfile._id);
    console.log(formData.level);
    setFormData({
      level: '',
    });
  };

  return (
    <Fragment>
      <form className="calculate-form" onSubmit={ (e) => onSubmit(e) }>
        <label style={ { color: '#fff', fontSize: 13 } }>
          <select name="level" onChange={ (e) => onChange(e) } value={ level }>
            <option value="0">Level 0</option>
            <option value="0.6">Level 1</option>
            <option value="0.75">Level 2</option>
            <option value="0.9">Level 3</option>
            <option value="1">Level 4</option>
            <option value="1.1">Level 5</option>
          </select>
        </label>
        <input
          type="submit"
          className="calculate"
          value="Calculate" />
      </form>
      <div className="exercise-container">
        {
          exerciseList.length > 0 &&
          <div className="exercise-container-inner">
            {
              exerciseList.map((exerciseItem) => (
                <ExerciseItem key={ exerciseItem._id } exerciseItem={ exerciseItem } />
              ))
            } </div>
        }
      </div>
    </Fragment>

  );
};

ClientEstimates.propTypes = {
  getEstimates: PropTypes.func.isRequired,
  getClientProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getEstimates, getClientProfile })(ClientEstimates);
