import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import CustomAlert from '../layout/CustomAlert';

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

  if (isAuthenticated) return <Redirect to="/dashboard/clients" />;

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="custom-alert">
          <CustomAlert />
        </div>
        <div className="card" style={ {
          minWidth: '20vw', maxWidth: '23vw', maxHight: '30vh'
        } }>
          <h3>Sign In</h3>
          <form onSubmit={ (e) => onSubmit(e) }>
            <div className="input-group form-group">
              <span className="input-group-text"><i className="fas fa-user"></i>
                <input type="text" required className="form-control-extra" name="email" value={ email } onChange={ (e) => onChange(e) } placeholder=" Email"
                />
              </span>
              <br />
              <span className="input-group-text"><i className="fas fa-key"></i>
                <input type="password" className="form-control-extra" required name="password" value={ password } minLength="6" maxLength="12" onChange={ (e) => onChange(e) } placeholder=" Password"
                />
              </span>

            </div>
            <input type="submit" className="input-login" value="Login" />
          </form>
          <div className="d-flex justify-content-center links" style={ { paddingTop: '1em', paddingBottom: '1em' } }>
            Don't have an account?<Link to="/register">Sign Up</Link>
          </div>
        </div>

      </div>
    </section >
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
