import React, { useState, useEffect } from 'react';
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
    window.location.reload(false);
  };

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onClick = (e) => {
    console.log(e.currentTarget);
    setVisible(!visible);
  };

  useEffect(() => {
    getClientProfile(clientProfile._id);
    setFormData({
      notes: loading || !clientProfile.notes ? '' : clientProfile.notes
    });
  }, [getClientProfile, clientProfile._id, loading, clientProfile.notes]);

  return (
    <>
      <div className="icon-static"><i className="fas fa-clipboard" onClick={ onClick } style={ { color: '#61c9a8af', fontSize: 15, padding: '0.25em' } }></i></div>
      <div className="note-container" > {
        visible &&
        <form className="add-notes" onSubmit={ handleSubmit }>
          <textarea placeholder="Add notes..." cols="50" rows="8" name="notes" value={ notes } onChange={ (e) => onChange(e) } style={ { resize: 'vertical', maxWidth: '100%', backgroundColor: '#00000080', color: '#fff', fontSize: 16, overflow: 'auto' } }>
          </textarea>
          <br />
          <input
            style={ { fontSize: 12 } }
            type="submit"
            className="calculate"
            value="Add" />
        </form>
      }

      </div >
    </>
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
