import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getClientProfile, getClientPrograms } from '../../actions/profile';
import CustomAlert from '../layout/CustomAlert';
import shortid from 'shortid';
import ShowClientPrograms from './ShowClientPrograms';


const ClientPrograms = ({ match, getClientProfile, getClientPrograms, profile: { clientProfile, programs, loading } }) => {
  const [program, setProgram] = useState({ programId: '' });

  const [visible, setVisible] = useState(false);




  useEffect(() => {
    getClientProfile(match.params.id);
    getClientPrograms(match.params.id);
  }, [loading, getClientProfile, getClientPrograms, match.params.id]);


  const onChange = (e) => {
    setProgram({ ...program, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setVisible(true);
  };

  return (
    <Fragment>
      <div className="alerts" style={ { position: 'absolute', marginLeft: 850 } }>
        <CustomAlert />
      </div>
      <form onSubmit={ (e) => onSubmit(e) } style={ { marginLeft: 50, marginTop: 20 } }>
        <button
          style={ { marginTop: -140, width: 20, marginLeft: 20, marginRight: 20, backgroundColor: 'transparent', border: 0, outline: 'none' } }
          type="submit"
          className="button-add"
          value="Next"><i className="fas fa-angle-double-right" style={ { width: 20, fontSize: 20, paddingRight: '0.25em' } }></i> </button>
        {/* <select name="clientId" onChange={ (e) => onChange(e) } value={ clientId } style={ { color: '#000', fontSize: 14, marginTop: 5, padding: '0.15em', borderRadius: '0.3em', marginRight: 15 } } required>
          <option value="">Client</option>
          {
            clientProfiles.map((profile) =>
              <option value={ `${profile._id}` } key={ shortid.generate() }>{ profile.clientFirstName } { profile.clientLastName }</option>
            )
          }
        </select>
        {
          clientProfiles &&
          < ClientProgramItem visible={ visible } clientId={ clientId } programs={ programs } clientProfile={ clientProfile } />
        }*/}
        {
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
          clientProfile && programs && visible &&
          <ShowClientPrograms programId={ program.programId } />
        }
      </form>
    </Fragment>
  );
};

ClientPrograms.propTypes = {
  getClientPrograms: PropTypes.func.isRequired,
  getClientProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getClientProfile, getClientPrograms })(ClientPrograms);
