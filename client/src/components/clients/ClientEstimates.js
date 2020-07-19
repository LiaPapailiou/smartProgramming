import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEstimates, getClientProfile } from '../../actions/profile';
import ExerciseItem from '../exercises/ExerciseItem';



const ClientEstimates = ({ clientId, getClientProfile, getEstimates, profile: { clientProfile, exerciseList } }) => {
  const [formData, setFormData] = useState({ level: '' });
  const [visible, setVisible] = useState(false);


  const { level } = formData;

  useEffect(() => {
    getClientProfile(clientId);
  }, [getClientProfile, clientId]);


  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    getEstimates(formData, clientProfile._id);
    setFormData({
      level: '',
    });
    setVisible(true);
  };

  return (
    <Fragment>
      <form className="calculate-form" onSubmit={ (e) => onSubmit(e) }>
        <label >
          <select name="level" onChange={ (e) => onChange(e) } value={ level } style={ { color: '#000', fontSize: 14, marginTop: 5, padding: '0.10em', borderRadius: '0.3em' } }>
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
      { visible ?
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
        </div> : null
      }
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
