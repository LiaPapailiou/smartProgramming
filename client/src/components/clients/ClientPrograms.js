import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getClientProfile, getAllProfiles, getClientPrograms } from '../../actions/profile';
import CustomAlert from '../layout/CustomAlert';
import shortid from 'shortid';
import ShowClientPrograms from './ShowClientPrograms';
import ClientProgramItem from './ClientProgramItem';

const ClientPrograms = ({ getClientProfile, getAllProfiles, getClientPrograms, profile: { clientProfile, clientProfiles, programs } }) => {
  // const [client, setClient] = useState({ clientId: '', programId: '' });
  const [client, setClient] = useState({ clientId: '' });
  const [visible, setVisible] = useState(false);
  const { clientId } = client;

  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);


  useEffect(() => {
    getClientProfile(client.clientId);
  }, [client.clientId]);

  useEffect(() => {
    getClientPrograms(client.clientId);
  }, [client.clientId]);
  const onChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
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
        <select name="clientId" onChange={ (e) => onChange(e) } value={ clientId } style={ { color: '#000', fontSize: 14, marginTop: 5, padding: '0.15em', borderRadius: '0.3em', marginRight: 15 } } required>
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
        }
      </form>
    </Fragment>
  );
};

ClientPrograms.propTypes = {
  getClientPrograms: PropTypes.func.isRequired,
  getClientProfile: PropTypes.func.isRequired,
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getClientProfile, getAllProfiles, getClientPrograms })(ClientPrograms);
