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
    clientAge: '',
    clientHeight: '',
    weight: '',
    clientYearsOfTrainingExperience: '',
    pastInjuries: '',
    currentInjuries: '',
    longTermGoals: '',
    shortTermGoals: '',
    clientAdditionalInfo: '',
    clientBodyScreening: '',
    benchPress: '',
    squat: '',
  });
  const {
    clientFirstName,
    clientLastName,
    clientPhone,
    clientEmail,
    clientSport,
    clientAge,
    clientHeight,
    weight,
    clientYearsOfTrainingExperience,
    pastInjuries,
    currentInjuries,
    longTermGoals,
    shortTermGoals,
    clientAdditionalInfo,
    clientBodyScreening,
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
      clientAge: '',
      clientHeight: '',
      weight: '',
      clientYearsOfTrainingExperience: '',
      pastInjuries: '',
      currentInjuries: '',
      longTermGoals: '',
      shortTermGoals: '',
      clientAdditionalInfo: '',
      clientBodyScreening: '',
      benchPress: '',
      squat: '',
    });
    window.location.replace(`/dashboard/client/${clientProfile._id}`);
  };
  const onClick = () => {
    window.location.replace(`/dashboard/client/${clientProfile._id}`);
  };
  useEffect(() => {

    getClientProfile(match.params.id);
    setFormData({
      clientFirstName: loading || !clientProfile.clientFirstName ? '' : clientProfile.clientFirstName,
      clientLastName: loading || !clientProfile.clientLastName ? '' : clientProfile.clientLastName,
      clientPhone: loading || !clientProfile.clientPhone ? '' : clientProfile.clientPhone,
      clientEmail: loading || !clientProfile.clientEmail ? '' : clientProfile.clientEmail,
      clientSport: loading || !clientProfile.clientSport ? '' : clientProfile.clientSport,
      clientAge: loading || !clientProfile.clientAge ? '' : clientProfile.clientAge,
      clientHeight: loading || !clientProfile.clientHeight ? '' : clientProfile.clientHeight,
      weight: loading || !clientProfile.clientWeight[0].weight ? '' : clientProfile.clientWeight[0].weight,
      clientYearsOfTrainingExperience: loading || !clientProfile.clientYearsOfTrainingExperience ? '' : clientProfile.clientYearsOfTrainingExperience,
      pastInjuries: loading || !clientProfile.clientInjuries[0].pastInjuries ? '' : clientProfile.clientInjuries[0].pastInjuries,
      currentInjuries: loading || !clientProfile.clientInjuries[0].currentInjuries ? '' : clientProfile.clientInjuries[0].currentInjuries,
      longTermGoals: loading || !clientProfile.clientGoals[0].longTermGoals ? '' : clientProfile.clientGoals[0].longTermGoals,
      shortTermGoals: loading || !clientProfile.clientGoals[0].shortTermGoals ? '' : clientProfile.clientGoals[0].shortTermGoals,
      clientAdditionalInfo: loading || !clientProfile.clientAdditionalInfo ? '' : clientProfile.clientAdditionalInfo,
      clientBodyScreening: loading || !clientProfile.clientBodyScreening ? '' : clientProfile.clientBodyScreening,
      benchPress: loading || !clientProfile.clientOneRM[0].benchPress ? '' : clientProfile.clientOneRM[0].benchPress,
      squat: loading || !clientProfile.clientOneRM[0].squat ? '' : clientProfile.clientOneRM[0].squat,
    });
  }, [getClientProfile, match.params.id, loading,]);

  return (
    <section className="add-client">
      <div className="add">
        <Navbar />
        <div className="dark-overlay">
          <div className="add-card" style={ { height: 600 } }>
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
                    name="clientAge"
                    value={ clientAge }
                    onChange={ (e) => onChange(e) }
                    placeholder=" Age"
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="weight"
                    value={ weight }
                    onChange={ (e) => onChange(e) }
                    placeholder=" Weight"
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="clientHeight"
                    value={ clientHeight }
                    onChange={ (e) => onChange(e) }
                    placeholder=" Height"
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="clientYearsOfTrainingExperience"
                    value={ clientYearsOfTrainingExperience }
                    onChange={ (e) => onChange(e) }
                    placeholder=" Years of training experience"
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="benchPress"
                    value={ benchPress }
                    onChange={ (e) => onChange(e) }
                    placeholder=" Bench Press One RM *"
                    required />
                  <input
                    type="text"
                    className="form-control"
                    name="squat"
                    value={ squat }
                    onChange={ (e) => onChange(e) }
                    placeholder=" Squat One RM *"
                    required />
                  <textarea placeholder="Past injuries" cols="26" rows="5" name="pastInjuries" value={ pastInjuries } onChange={ (e) => onChange(e) } style={ { resize: 'vertical', maxWidth: '70%', color: '#000' } } />
                  <br />
                  <textarea placeholder="Current injuries" cols="26" rows="5" name="currentInjuries" value={ currentInjuries } onChange={ (e) => onChange(e) } style={ { resize: 'vertical', maxWidth: '70%', color: '#000' } } />
                  <br />
                  <textarea placeholder="Long Term Goals" cols="26" rows="5" name="longTermGoals" value={ longTermGoals } onChange={ (e) => onChange(e) } style={ { resize: 'vertical', maxWidth: '70%', color: '#000' } } />
                  <br />
                  <textarea placeholder="Short Term Goals" cols="26" rows="5" name="shortTermGoals" value={ shortTermGoals } onChange={ (e) => onChange(e) } style={ { resize: 'vertical', maxWidth: '70%', color: '#000' } } />
                  <br />
                  <textarea placeholder="Additional Information" cols="26" rows="5" name="clientAdditionalInfo" value={ clientAdditionalInfo } onChange={ (e) => onChange(e) } style={ { resize: 'vertical', maxWidth: '70%', color: '#000' } } />
                  <br />
                  <textarea placeholder="Body Screening" cols="26" rows="5" name="clientBodyScreening" value={ clientBodyScreening } onChange={ (e) => onChange(e) } style={ { resize: 'vertical', maxWidth: '70%', color: '#000' } } />
                  <br />

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
