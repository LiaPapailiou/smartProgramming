import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRM, getClientProfile } from '../../actions/profile';
import { withRouter } from 'react-router-dom';


const AddNewRM = ({ match, addRM, getClientProfile, profile: { clientProfile, loading } }) => {
  const [formData, setFormData] = useState({
    clientFirstName: '',
    benchPress: '',
    squat: '',
  });

  useEffect(() => {
    getClientProfile(match.params.id);
  }, [loading, getClientProfile, match.params.id]);

  const { benchPress, squat } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addRM(formData, clientProfile._id);
    setFormData({
      benchPress: '',
      squat: '',
    });
    window.location.replace(`/dashboard/client/${clientProfile._id}`);
  };
  const onClick = (e) => {
    window.location.replace(`/dashboard/client/${clientProfile._id}`);
  };

  return (
    <section>
      <div className="add-rm-container">
        <div className="add-rm-card">
          <h3 style={ { paddingLeft: '1em' } }>Add new RM</h3>
          <div className="add-card-body">
            <form className="add-form" onSubmit={ (e) => onSubmit(e) }>
              <div className="add-input-group">
                <input
                  type="text"
                  className="form-control-extra"
                  name="benchPress"
                  value={ benchPress }
                  onChange={ (e) => onChange(e) }
                  placeholder=" Bench Press"
                  required />
                <input
                  type="text"
                  className="form-control-extra"
                  name="squat"
                  value={ squat }
                  onChange={ (e) => onChange(e) }
                  placeholder=" Squat"
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
                  className="input-add"
                  value="Submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section >
  );
};

AddNewRM.propTypes = {
  addRM: PropTypes.func.isRequired,
  getClientProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getClientProfile, addRM })(withRouter(AddNewRM));
