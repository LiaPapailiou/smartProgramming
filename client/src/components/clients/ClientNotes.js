import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNotes, getClientProfile } from '../../actions/profile';

const ClientNotes = ({ addNotes, getClientProfile, profile: { clientProfile, loading } }) => {
  const [visible, setVisible] = useState(true);
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
  const onClick = () => setVisible(!visible);
  return (
    <div className="note-container" onClick={ onClick }> <i class="fas fa-plus" style={ { color: '#61c9a8af', fontSize: 15, padding: '0.25em' } }></i>{
      visible ?
        <form className="add-notes" onSubmit={ (e) => onSubmit(e) }>
          <textarea placeholder="Add notes..." cols="30" rows="15" name="notes" value={ notes } onChange={ (e) => onChange(e) } style={ { resize: 'vertical', maxWidth: '100%', backgroundColor: '#00000080' } }>
          </textarea>
          <br />
          <input
            type="submit"
            className="calculate"
            value="Add" />
        </form> : null
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
