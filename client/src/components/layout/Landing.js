import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    console.log('success');
  };
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h3>Sign In</h3>
            </div>
            <div className="card-body">
              <form onSubmit={ (e) => onSubmit(e) }>
                <div className="input-group form-group">
                  <span className="input-group-text"><i className="fas fa-user"></i>
                    <input type="text" required className="form-control" name="email" value={ email } onChange={ (e) => onChange(e) } placeholder=" Email" />
                  </span>
                  <br />
                  <span className="input-group-text"><i className="fas fa-key"></i>
                    <input type="password" className="form-control" required name="password" value={ password } minLength="6" maxLength="12" onChange={ (e) => onChange(e) } placeholder=" Password" />
                  </span>

                </div>
                <input type="submit" className="input-login" value="Login" />
              </form>
            </div>
            <div className="login-card-footer">
              <div className="d-flex justify-content-center links">
                Don't have an account?<Link to="/register">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
