import React, { useState } from 'react';
import shortid from 'shortid';
import ShowClientPrograms from './ShowClientPrograms';

const ClientProgramItem = (props) => {
  const [program, setProgram] = useState({ programId: '' });

  const {
    visible,
    programs,
    clientProfile,
  } = props;

  const onChange = (e) => {
    setProgram({ ...program, [e.target.name]: e.target.value });
  };

  return (
    <>
      {
        clientProfile && programs ?
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
      { visible && clientProfile && programs &&
        <ShowClientPrograms programId={ program.programId } />
      }
    </>
  );
};


export default ClientProgramItem;
