import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
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
      console.log('passwords do not much');
    } else {
      console.log('success');
    }
  };

  return (
    <div className="register">
      <div className="register-container">
        <div className="register-card">
          <div className="register-card-header">
            <h3>Register</h3>
          </div>
          <div className="card-body">
            <form className="register-form" onSubmit={ (e) => onSubmit(e) }>
              <div className="register-input-group">
                <span className="register-input-group-text">
                  <input type="text" required className="form-control" name="firstName" value={ firstName } onChange={ (e) => onChange(e) } placeholder=" First name" />
                </span>
                <span className="register-input-group-text">
                  <input type="text" className="form-control" name="lastName" value={ lastName } onChange={ (e) => onChange(e) } placeholder=" Last name (optional)" />
                </span>
                <span className="register-input-group-text">
                  <input type="text" required className="form-control" name="email" value={ email } onChange={ (e) => onChange(e) } placeholder=" Email" />
                </span>
                <br />
                <span className="register-input-group-text">
                  <input type="password" required className="form-control" name="password" minLength="6" value={ password } onChange={ (e) => onChange(e) } placeholder=" Password" />
                </span>
                <span className="register-input-group-text">
                  <input type="password" required className="form-control" name="passwordRepeat" minLength="6" value={ passwordRepeat } onChange={ (e) => onChange(e) } placeholder=" Confirm password" />
                </span>

              </div>
              <input type="submit" className="input-register" value="Register" />
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
  );
};

export default Register;