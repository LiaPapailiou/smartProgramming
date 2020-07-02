import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRM, getClientProfile } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const AddNewRM = ({ match, clientId, addRM, clientProfile: { profile, loading } }) => {
  const [formData, setFormData] = useState({
    benchPress: '',
    squat: '',
  });

  useEffect(() => {
    getClientProfile(match.params.id);
    console.log(match.params.id);
    setFormData({
      benchPress: loading || !profile.clientOneRM ? '' : profile.clientOneRM.benchPress,
      squat: loading || !profile.clientOneRM ? '' : profile.clientOneRM.squat,
    });
  }, [loading]);

  const { benchPress, squat } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addRM(formData, clientId);
    setFormData({
      benchPress: '',
      squat: '',
    });
  };

  return (
    <div className="add-rm-container">
      <div className="add-card">
        <div className="add-card-header">
          <h3>Add new RM</h3>
        </div>
        <div className="add-card-body">
          <form className="add-form" onSubmit={ (e) => onSubmit(e) }>
            <div className="add-input-group">
              <input
                type="text"
                className="form-control"
                name="benchPress"
                value={ benchPress }
                onChange={ (e) => onChange(e) }
                placeholder=" Bench Press"
                required />
              <input
                type="text"
                className="form-control"
                name="squat"
                value={ squat }
                onChange={ (e) => onChange(e) }
                placeholder=" Squat"
                required />
            </div>
            <input
              type="submit"
              className="input-add-rm"
              value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

AddNewRM.propTypes = {
  addRM: PropTypes.func.isRequired,
  getClientProfile: PropTypes.func.isRequired,
  clientProfile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  clientProfile: state.profile,
});
export default connect(mapStateToProps, { getClientProfile, addRM })(withRouter(AddNewRM));
