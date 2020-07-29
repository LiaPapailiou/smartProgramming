import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { insertClient } from '../../actions/profile';
import CustomAlert from '../layout/CustomAlert';
import { useHistory } from 'react-router-dom';

const AddClient = ({ insertClient, history }) => {
  let localHistory = useHistory();
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
    insertClient(formData, history);
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
  };

  return (
    <section className="add-client">
      <div className="add">
        <CustomAlert />
        <div className="dark-overlay">
          <div className="add-card">
            <h3>Add Client</h3>
            <div className="add-card-body">
              <form className="add-form" onSubmit={ (e) => onSubmit(e) }>
                <div className="add-input-group">
                  <input
                    type="text"
                    className="form-control"
                    name="clientFirstName"
                    value={ clientFirstName }
                    onChange={ (e) => onChange(e) }
                    placeholder=" First Name *"
                    required />
                  <input
                    type="text"
                    className="form-control"
                    name="clientLastName"
                    value={ clientLastName }
                    onChange={ (e) => onChange(e) }
                    placeholder=" Last Name *"
                    required />
                  <input
                    type="text"
                    className="form-control"
                    name="clientEmail"
                    value={ clientEmail }
                    onChange={ (e) => onChange(e) }
                    placeholder=" Email"
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="clientPhone"
                    value={ clientPhone }
                    onChange={ (e) => onChange(e) }
                    placeholder=" Phone Number"
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="clientSport"
                    value={ clientSport }
                    onChange={ (e) => onChange(e) }
                    placeholder=" Type of Sport"
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
                  onClick={ () => localHistory.push('/dashboard/clients') }
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
    </section>
  );
};

AddClient.propTypes = {
  insertClient: PropTypes.func.isRequired,
};

export default connect(null, { insertClient })(withRouter(AddClient));
