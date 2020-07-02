import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editClient, getClientProfile } from '../../actions/profile';
import Navbar from '../layout/Navbar';
import { withRouter } from 'react-router-dom';

const EditClientProfile = ({ match, clientid, editClient, getClientProfile, clientProfile: { profile, loading } }) => {
  const [formData, setFormData] = useState({
    clientFirstName: '',
    clientLastName: '',
    clientPhone: '',
    clientEmail: '',
    clientSport: '',
    benchPress: '',
    squat: '',
  });

  useEffect(() => {
    getClientProfile(match.params.id);
    console.log(match.params.id);
    setFormData({
      clientFirstName: loading || !profile.clientFirstName ? '' : profile.clientFirstName,
      clientLastName: loading || !profile.clientLastName ? '' : profile.clientLastName,
      clientPhone: loading || !profile.clientPhone ? '' : profile.clientPhone,
      clientEmail: loading || !profile.clientEmail ? '' : profile.clientEmail,
      clientSport: loading || !profile.clientSport ? '' : profile.clientSport,
      benchPress: loading || !profile.clientOneRM ? '' : profile.clientOneRM.benchPress,
      squat: loading || !profile.clientOneRM ? '' : profile.clientOneRM.squat,
    });
  }, [loading]);

  const {
    clientFirstName,
    clientLastName,
    clientPhone,
    clientEmail,
    clientSport,
    benchPress,
    squat,
  } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    editClient(formData, clientid);
    setFormData({
      clientFirstName: '',
      clientLastName: '',
      clientPhone: '',
      clientEmail: '',
      clientSport: '',
      benchPress: '',
      squat: '',
    });
  };
  return (
    <div className="add-client">
      <div className="add">
        <Navbar />
        <div className="dark-overlay">
          <div className="add-container">
            <div className="add-card">
              <div className="add-card-header">
                <h3>Edit</h3>
              </div>
              <div className="add-card-body">
                <form className="add-form" onSubmit={ (e) => onSubmit(e) }>
                  <div className="add-input-group">
                    <input
                      type="text"
                      className="form-control"
                      name="clientFirstName"
                      value={ clientFirstName }
                      onChange={ (e) => onChange(e) }
                      placeholder=" First Name"
                      required />
                    <input
                      type="text"
                      className="form-control"
                      name="clientLastName"
                      value={ clientLastName }
                      onChange={ (e) => onChange(e) }
                      placeholder=" Last Name (optional)" />
                    <input
                      type="text"
                      className="form-control"
                      name="clientEmail"
                      value={ clientEmail }
                      onChange={ (e) => onChange(e) }
                      placeholder=" Email (optional)"
                    />
                    <input
                      type="text"
                      className="form-control"
                      name="clientPhone"
                      value={ clientPhone }
                      onChange={ (e) => onChange(e) }
                      placeholder=" Phone Number (optional"
                    />
                    <input
                      type="text"
                      className="form-control"
                      name="clientSport"
                      value={ clientSport }
                      onChange={ (e) => onChange(e) }
                      placeholder=" Type of Sport (optional)"
                    />
                    <input
                      type="text"
                      className="form-control"
                      name="benchPress"
                      value={ benchPress }
                      onChange={ (e) => onChange(e) }
                      placeholder=" Bench Press One RM"
                      required />
                    <input
                      type="text"
                      className="form-control"
                      name="squat"
                      value={ squat }
                      onChange={ (e) => onChange(e) }
                      placeholder=" Squat One RM"
                      required />
                  </div>
                  <input
                    type="submit"
                    className="input-add"
                    value="Edit" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EditClientProfile.propTypes = {
  editClient: PropTypes.func.isRequired,
  getClientProfile: PropTypes.func.isRequired,
  clientProfile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  clientProfile: state.profile,
});
export default connect(mapStateToProps, { editClient, getClientProfile })(withRouter(EditClientProfile));
