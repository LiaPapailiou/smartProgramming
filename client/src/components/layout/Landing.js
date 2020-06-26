import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h3>Sign In</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="input-group form-group">
                  <span className="input-group-text"><i className="fas fa-user"></i>
                    <input type="text" className="form-control" placeholder="username" />
                  </span>
                  <br />
                  <span className="input-group-text"><i className="fas fa-key"></i>
                    <input type="password" className="form-control" placeholder="password" />
                  </span>

                </div>
                <div className="button">
                  <Link to="/login" className="btn-login">Login</Link>
                </div>
              </form>
            </div>
            <div className="card-footer">
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
