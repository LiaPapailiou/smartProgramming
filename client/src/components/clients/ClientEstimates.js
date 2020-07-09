import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEstimates, getClientProfile } from '../../actions/profile';



const ClientEstimates = ({ clientId, getClientProfile, getEstimates, profile: { clientProfile } }) => {
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
    <form className="add-form" onSubmit={ (e) => onSubmit(e) }>
      <label style={ { color: '#fff', fontSize: 13 } }>
        Select level { '  ' }
        <select name="level" onChange={ (e) => onChange(e) } value={ level }>
          <option value="0">0</option>
          <option value="0.6">1</option>
          <option value="0.75">2</option>
          <option value="0.9">3</option>
          <option value="1">4</option>
          <option value="1.1">5</option>
        </select>
      </label>
      <input
        type="submit"
        className="calculate"
        value="Calculate" />
    </form>
  );
};

ClientEstimates.propTypes = {
  getEstimates: PropTypes.func.isRequired,
  getClientProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  exercise: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getEstimates, getClientProfile })(ClientEstimates);
