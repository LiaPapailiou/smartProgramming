import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addWeight, getClientProfile } from '../../actions/profile';
import { withRouter } from 'react-router-dom';

const AddWeight = ({ match, addWeight, getClientProfile, profile: { clientProfile, loading } }) => {
  const [formData, setFormData] = useState({
    weight: '',
  });
  useEffect(() => {
    getClientProfile(match.params.id);
  }, [loading, getClientProfile, match.params.id]);
  const { weight } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addWeight(formData, clientProfile._id);
    setFormData({
      weight: '',
    });
    window.location.replace(`/dashboard/client/${clientProfile._id}`);
  };
  const onClick = (e) => {
    window.location.replace(`/dashboard/client/${clientProfile._id}`);
  };

  return (
    <section className="add-new-rm">
      <div className="add-rm">
        <div className="dark-overlay">
          <div className="add-rm-container">
            <div className="add-rm-card" style={ { height: '23vh' } }>
              <h3>Add Weight</h3>
              <div className="add-card-body">
                <form className="add-form" onSubmit={ (e) => onSubmit(e) } style={ { marginTop: '2em', } }>
                  <div className="add-input-group">
                    <input
                      type="text"
                      className="form-control-extra"
                      name="weight"
                      value={ weight }
                      onChange={ (e) => onChange(e) }
                      placeholder=" Weight in kg"
                      required />
                  </div>
                  <div className="lib-buttons-extra">

                    <input
                      type="button"
                      className="input-add"
                      onClick={ (e) => onClick(e) }
                      value="Go Back" />
                    <input
                      type="submit"
                      className="input-add-rm"
                      value="Submit" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

AddWeight.propTypes = {
  addWeight: PropTypes.func.isRequired,
  getClientProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { addWeight, getClientProfile })(withRouter(AddWeight));
