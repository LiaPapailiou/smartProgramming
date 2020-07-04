import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRM, getClientProfile } from '../../actions/profile';
import { withRouter } from 'react-router-dom';
import Navbar from '../layout/Navbar';

const AddNewRM = ({ match, addRM, getClientProfile, profile: { clientProfile, loading } }) => {
  const [formData, setFormData] = useState({
    benchPress: '',
    squat: '',
  });

  useEffect(() => {
    getClientProfile(match.params.id);
  }, [loading, getClientProfile, match.params.id]);

  const { benchPress, squat } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addRM(formData, clientProfile._id);
    setFormData({
      benchPress: '',
      squat: '',
    });
  };

  return (
    <div className="add-new-rm">
      <div className="add-rm">
        <Navbar />

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
      </div>
    </div>
  );
};

AddNewRM.propTypes = {
  addRM: PropTypes.func.isRequired,
  getClientProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getClientProfile, addRM })(withRouter(AddNewRM));
