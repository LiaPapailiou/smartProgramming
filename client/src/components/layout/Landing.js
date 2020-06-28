import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Landing = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    setFormData({
      email: '',
      password: '',
    });
  };

  if (isAuthenticated) return <Redirect to="/dashboard" />;

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

Landing.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProp = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProp, { login })(Landing);
