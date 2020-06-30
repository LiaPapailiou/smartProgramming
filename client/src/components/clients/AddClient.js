import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar';
const AddClient = (props) => {
  const [formData, setFormData] = useState({
    clientFirstName: '',
    clientLastName: '',
    clientPhone: '',
    clientEmail: '',
    clientSport: '',
    clientOneRM: [
      {
        benchPress: '',
        squat: '',
      }
    ],
  });
  const {
    clientFirstName,
    clientLastName,
    clientPhone,
    clientEmail,
    clientSport,
    clientOneRM: [
      {
        benchPress,
        squat,
      }
    ],
  } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // register({ clientFirstName, clientLastName, clientPhone, clientEmail, clientSport, benchPress, squat });
    setFormData({
      clientFirstName: '',
      clientLastName: '',
      clientPhone: '',
      clientEmail: '',
      clientSport: '',
      clientOneRM: [
        {
          benchPress: '',
          squat: '',
        }
      ],
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
                <h3>Add Client</h3>
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
                    value="Add" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AddClient.propTypes = {

};

export default connect()(AddClient);
