import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';


const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordRepeat: '',
  });

  const { firstName, lastName, email, password, passwordRepeat } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordRepeat) {
      setAlert('Passwords do not much', 'danger');
    } else {
      register({ firstName, lastName, email, password });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordRepeat: '',
      });
    }
  };
  if (isAuthenticated) return <Redirect to="/dashboard" />;
  return (
    <div className="register">
      <Alert />
      <div className="dark-overlay">
        <div className="register-container">
          <div className="register-card">
            <div className="register-card-header">
              <h3>Register</h3>
            </div>
            <div className="card-body">
              <form className="register-form" onSubmit={ (e) => onSubmit(e) }>
                <div className="register-input-group">
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={ firstName }
                    onChange={ (e) => onChange(e) }
                    placeholder=" First Name"
                    required />
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={ lastName }
                    onChange={ (e) => onChange(e) }
                    placeholder=" Last Name (optional)" />
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={ email }
                    onChange={ (e) => onChange(e) }
                    placeholder=" Email"
                    required />
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    minLength="6"
                    value={ password }
                    onChange={ (e) => onChange(e) }
                    placeholder=" Password"
                    required />
                  <input
                    type="password"
                    className="form-control"
                    name="passwordRepeat"
                    minLength="6"
                    value={ passwordRepeat }
                    onChange={ (e) => onChange(e) }
                    placeholder=" Confirm Password"
                    required />
                </div>
                <input
                  type="submit"
                  className="input-register"
                  value="Register" />
              </form>
              <div className="card-footer">
                <div className="d-flex justify-content-center links">
                  Have an account?<Link to="/">Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProp, { setAlert, register })(Register);