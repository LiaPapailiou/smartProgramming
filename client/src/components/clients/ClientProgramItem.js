import React, { useState, useEffect } from 'react';
import shortid from 'shortid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getClientPrograms, getClientProfile } from '../../actions/profile';
import ShowClientPrograms from './ShowClientPrograms';

const ClientProgramItem = (props, { match, getClientPrograms, getClientProfile, profile: { clientProfile, programs, loading } }) => {
  const [program, setProgram] = useState({ programId: '' });


  const onChange = (e) => {
    setProgram({ ...program, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getClientProfile(match.params.id);
    getClientPrograms(match.params.id);
  }, [loading, getClientProfile, getClientPrograms, match.params.id]);

  return (
    <>
      {/* {
        programs ?
          (
            <select name="programId" onChange={ (e) => onChange(e) } value={ program.programId } style={ { color: '#000', fontSize: 14, marginTop: 5, padding: '0.15em', borderRadius: '0.3em', marginRight: 15 } } required>
              <option value="">Programs</option>
              {
                programs.map((program) => (

                  <option value={ `${program._id}` } key={ shortid.generate() }>{ program.month } { program.year }</option>
                )
                ) }
            </select>
          ) : null
      }

      {
        clientProfile && programs &&
        <ShowClientPrograms programId={ program.programId } />
      } */}
    </>
  );
};

ClientProgramItem.propTypes = {
  getClientPrograms: PropTypes.func.isRequired,
  getClientProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getClientPrograms, getClientProfile })(withRouter(ClientProgramItem));
