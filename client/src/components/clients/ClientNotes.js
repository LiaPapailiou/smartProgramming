import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNotes, getClientProfile } from '../../actions/profile';


const ClientNotes = ({ addNotes, getClientProfile, profile: { clientProfile, loading } }) => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ notes: '' });
  const { notes } = formData;
  const handleSubmit = (e) => {
    e.preventDefault();
    addNotes(formData, clientProfile._id);
    setFormData({ notes: '' });
  };

  useEffect(() => {
    getClientProfile(clientProfile._id);
  }, [getClientProfile, clientProfile._id, loading, handleSubmit]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onClick = (e) => {
    console.log(e.currentTarget);
    setVisible(!visible);
  };
  return (
    <div className="note-container" > <i className="fas fa-plus" onClick={ onClick } style={ { color: '#61c9a8af', fontSize: 15, padding: '0.25em' } }></i>{
      visible &&
      <form className="add-notes" onSubmit={ handleSubmit }>
        <textarea placeholder="Add notes..." cols="55" rows="10" name="notes" value={ notes } onChange={ (e) => onChange(e) } style={ { resize: 'vertical', maxWidth: '100%', backgroundColor: '#00000080', color: '#fff' } }>
        </textarea>
        <br />
        <input
          type="submit"
          className="calculate"
          value="Add" />
      </form>
    }

    </div >
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
