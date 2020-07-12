import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNotes, getClientProfile } from '../../actions/profile';

const ClientNotes = ({ addNotes, getClientProfile, profile: { clientProfile, loading } }) => {
  const [formData, setFormData] = useState({ notes: '' });
  const { notes } = formData;
  const onSubmit = (e) => {
    e.preventDefault();
    addNotes(formData, clientProfile._id);
    setFormData({ notes: '' });
  };
  useEffect(() => {
    getClientProfile(clientProfile._id);

  }, [getClientProfile, loading, onSubmit]);
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="client-notes">
      <div className="note-container">
        <form className="add-notes" onSubmit={ (e) => onSubmit(e) }>
          <textarea placeholder="Add notes..." cols="30" rows="5" name="notes" value={ notes } onChange={ (e) => onChange(e) }>
          </textarea>
          <input
            type="submit"
            className="input-add"
            value="Add" />
        </form>
      </div>
    </div>
  );
};

ClientNotes.propTypes = {
  addNotes: PropTypes.func.isRequired,
  getClientProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { addNotes, getClientProfile })(ClientNotes);
