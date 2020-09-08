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
            <h3 style={ { fontSize: 24, height: '6vh' } }>Client Information</h3>
            <div className="add-card-body">
              <form className="add-form" onSubmit={ (e) => onSubmit(e) }>
                <div className="add-input-group">
                  <h4>First Name *</h4>
                  <input
                    type="text"
                    className="form-control"
                    name="clientFirstName"
                    value={ clientFirstName }
                    onChange={ (e) => onChange(e) }
                    required />
                  <h4>Last Name *</h4>
                  <input
                    type="text"
                    className="form-control"
                    name="clientLastName"
                    value={ clientLastName }
                    onChange={ (e) => onChange(e) }
                    required />
                  <h4 style={ { marginLeft: -505 } }>Email</h4>
                  <input
                    type="text"
                    className="form-control"
                    name="clientEmail"
                    value={ clientEmail }
                    onChange={ (e) => onChange(e) }
                  />
                  <h4 style={ { marginLeft: -500 } }>Phone</h4>
                  <input
                    type="text"
                    className="form-control"
                    name="clientPhone"
                    value={ clientPhone }
                    onChange={ (e) => onChange(e) }
                  />
                  <h4 style={ { marginLeft: -500 } }>Sport</h4>
                  <input
                    type="text"
                    className="form-control"
                    name="clientSport"
                    value={ clientSport }
                    onChange={ (e) => onChange(e) }
                  />
                  <span style={ { borderBottom: '1px solid #6d6d6d', width: '29vw', marginBottom: 10 } }></span>
                  <h4 style={ { marginLeft: -520 } }>Age</h4>
                  <input
                    type="text"
                    className="form-control"
                    name="clientAge"
                    value={ clientAge }
                    onChange={ (e) => onChange(e) }
                  />
                  <h4 style={ { marginLeft: -498 } }>Weight</h4>
                  <input
                    type="text"
                    className="form-control"
                    name="weight"
                    value={ weight }
                    onChange={ (e) => onChange(e) }
                  />
                  <h4 style={ { marginLeft: -498 } }>Height</h4>
                  <input
                    type="text"
                    className="form-control"
                    name="clientHeight"
                    value={ clientHeight }
                    onChange={ (e) => onChange(e) }
                  />
                  <h4 style={ { marginLeft: -318 } }>Years of previous experience</h4>
                  <input
                    type="text"
                    className="form-control"
                    name="clientYearsOfTrainingExperience"
                    value={ clientYearsOfTrainingExperience }
                    onChange={ (e) => onChange(e) }
                  />
                  <h4 style={ { marginLeft: -440 } }>Bench Press *</h4>
                  <input
                    type="text"
                    className="form-control"
                    name="benchPress"
                    value={ benchPress }
                    onChange={ (e) => onChange(e) }
                    required />
                  <h4 style={ { marginLeft: -494 } }>Squat *</h4>
                  <input
                    type="text"
                    className="form-control"
                    name="squat"
                    value={ squat }
                    onChange={ (e) => onChange(e) }
                    required />
                  <span style={ { borderBottom: '1px solid #6d6d6d', width: '29vw', marginBottom: 10 } }></span>
                  <h4>Past Injuries</h4>
                  <textarea cols="65" rows="5" name="pastInjuries" value={ pastInjuries } onChange={ (e) => onChange(e) } style={ { resize: 'vertical', maxWidth: '100%', color: '#000' } } />
                  <br />
                  <h4 style={ { marginLeft: -425 } }>Current Injuries</h4>
                  <textarea cols="65" rows="5" name="currentInjuries" value={ currentInjuries } onChange={ (e) => onChange(e) } style={ { resize: 'vertical', maxWidth: '100%', color: '#000' } } />
                  <br />
                  <h4 style={ { marginLeft: -415 } }>Long Term Goals</h4>
                  <textarea cols="65" rows="5" name="longTermGoals" value={ longTermGoals } onChange={ (e) => onChange(e) } style={ { resize: 'vertical', maxWidth: '100%', color: '#000' } } />
                  <br />
                  <h4 style={ { marginLeft: -415 } }>Short Term Goals</h4>
                  <textarea cols="65" rows="5" name="shortTermGoals" value={ shortTermGoals } onChange={ (e) => onChange(e) } style={ { resize: 'vertical', maxWidth: '100%', color: '#000' } } />
                  <br />
                  <h4 style={ { marginLeft: -435 } }>Additional Info</h4>
                  <textarea cols="65" rows="5" name="clientAdditionalInfo" value={ clientAdditionalInfo } onChange={ (e) => onChange(e) } style={ { resize: 'vertical', maxWidth: '100%', color: '#000' } } />
                  <br />
                  <h4 style={ { marginLeft: -430 } }>Body Screening</h4>
                  <textarea cols="65" rows="5" name="clientBodyScreening" value={ clientBodyScreening } onChange={ (e) => onChange(e) } style={ { resize: 'vertical', maxWidth: '100%', color: '#000' } } />
                  <br />
                </div>
                <div className="lib-buttons" style={ { marginLeft: 280 } }>
                  <input
                    type="button"
                    className="input-add"
                    onClick={ () => localHistory.push('/dashboard/clients') }
                    value="Go Back" />
                  <input
                    type="submit"
                    className="input-add"
                    value="Add" />
                </div>
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
