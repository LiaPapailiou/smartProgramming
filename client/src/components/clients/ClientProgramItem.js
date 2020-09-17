import React, { useEffect, Fragment, useState } from 'react';
import { getClientProfile, getClientPrograms } from '../../actions/profile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ShowClientPrograms from './ShowClientPrograms';

const ClientProgramItem = (props, { getClientProfile, getClientPrograms }) => {
  // const [visible, setVisible] = useState(false);
  // useEffect(() => {
  //   getClientProfile(props.clientId);
  //   getClientPrograms(props.clientId);
  // }, [props.clientId]);

  console.log(props);
  return (
    <div></div>
    // <Fragment>
    //   <select name="programId" onChange={ (e) => onChange(e) } value={ props.programId } style={ { color: '#000', fontSize: 14, marginTop: 5, padding: '0.15em', borderRadius: '0.3em', marginRight: 15 } } required>
    //     <option value="">Programs</option>
    //     {
    //       clientProfile &&
    //       programs.map((program) => (

    //         <option value={ `${program._id}` } key={ shortid.generate() }>{ program.month } { program.year }</option>
    //       )
    //       )
    //     }
    //   </select>
    //   { visible && clientProfiles && programs &&
    //     <ShowClientPrograms programId={ client.programId } />
    //   }
    // </Fragment>
  );
};

ClientProgramItem.propTypes = {
  getClientProfile: PropTypes.func.isRequired,
  getClientPrograms: PropTypes.func.isRequired,
};


export default connect(null, { getClientProfile, getClientPrograms })(ClientProgramItem);
