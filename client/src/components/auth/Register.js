import React from 'react';
import { Link } from 'react-router-dom';


export const Register = () => {
  return (
    <div className="register">
      <div className="register-container">
        <div className="register-card">
          <div className="register-card-header">
            <h3>Register</h3>
          </div>
          <div className="card-body">
            <form>
              <div className="register-input-group">
                <span className="register-input-group-text">
                  <input type="text" required className="form-control" placeholder=" first name" />
                </span>
                <span className="register-input-group-text">
                  <input type="text" className="form-control" placeholder=" last name (optional)" />
                </span>
                <span className="register-input-group-text">
                  <input type="text" required className="form-control" placeholder=" email" />
                </span>
                <br />
                <span className="register-input-group-text">
                  <input type="password" required className="form-control" placeholder=" password" />
                </span>

              </div>
              <div className="button">
                <Link to="/register" className="btn-login">Register</Link>
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center links">
              Have an account?<Link to="/register">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;