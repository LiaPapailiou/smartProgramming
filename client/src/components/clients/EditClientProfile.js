import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editClient, getClientProfile } from '../../actions/profile';
import Navbar from '../layout/Navbar';

const EditClientProfile = ({ match, editClient, getClientProfile, profile: { clientProfile, loading } }) => {

  const [formData, setFormData] = useState({
    clientFirstName: '',
    clientLastName: '',
    clientPhone: '',
    clientEmail: '',
    clientSport: '',
    benchPress: '',
    squat: '',
  });
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
    editClient(formData, clientProfile._id);
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
  const onClick = (e) => {
    window.history.back();
  };
  useEffect(() => {

    getClientProfile(match.params.id);
    setFormData({
      clientFirstName: loading || !clientProfile.clientFirstName ? '' : clientProfile.clientFirstName,
      clientLastName: loading || !clientProfile.clientLastName ? '' : clientProfile.clientLastName,
      clientPhone: loading || !clientProfile.clientPhone ? '' : clientProfile.clientPhone,
      clientEmail: loading || !clientProfile.clientEmail ? '' : clientProfile.clientEmail,
      clientSport: loading || !clientProfile.clientSport ? '' : clientProfile.clientSport,
      benchPress: loading || !clientProfile.clientOneRM[0].benchPress ? '' : clientProfile.clientOneRM[0].benchPress,
      squat: loading || !clientProfile.clientOneRM[0].squat ? '' : clientProfile.clientOneRM[0].squat,
    });
  }, [getClientProfile, loading,]);

  return (
    <section className="add-client">
      <div className="add">
        <Navbar />
        <div className="dark-overlay">

          <div className="add-card">
            <h3 style={ { paddingRight: 240 } }>Edit</h3>
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
                  type="button"
                  className="input-add"
                  onClick={ (e) => onClick(e) }
                  value="Go Back" />
                <input
                  type="submit"
                  className="input-add"
                  value="Edit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

EditClientProfile.propTypes = {
  editClient: PropTypes.func.isRequired,
  getClientProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getClientProfile, editClient })(EditClientProfile);
