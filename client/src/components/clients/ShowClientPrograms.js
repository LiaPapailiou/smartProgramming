import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getClientProgramById } from '../../actions/profile';
import shortid from 'shortid';
import ReactExport from 'react-export-excel';
import VolumeChart from './VolumeChart';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ShowClientPrograms = ({ programId, getClientProgramById, profile: { program, clientProfile } }) => {

  useEffect(() => {
    getClientProgramById(programId);
  }, [programId]);

  let daysPerWeek;
  let days = [];
  if (program.clientDetails !== undefined) {
    daysPerWeek = program.clientDetails.daysPerWeek;
  }

  for (let i = 1;i < daysPerWeek + 1;i += 1) {
    days.push(i);
  }

  return (
    <>
      <div style={ { marginLeft: 600, marginTop: -40, marginBottom: 10 } }>
        { program.month && program.clientDetails && clientProfile &&
          <ExcelFile element={ <button className="input-add">Download xlsx</button> } filename={ `${clientProfile.clientFirstName}_${program.clientDetails.month}_${program.clientDetails.year}` }>
            <ExcelSheet data={ program.month } name="Programs">
              <ExcelColumn label="Week" value="week" />
              <ExcelColumn label="Day" value="day" />
              <ExcelColumn label="Exercise" value="exercise" />
              <ExcelColumn label="load kg min" value="min" />
              <ExcelColumn label="load kg max" value="max" />
              <ExcelColumn label="Reps min" value="repsMin" />
              <ExcelColumn label="Reps min" value="repsMax" />
              <ExcelColumn label="Sets" value="sets" />
            </ExcelSheet>
          </ExcelFile> }
      </div>
      <div className="table-wrapper" style={ { width: '46vw', maxHeight: '80vh', minHeight: '50vh', backgroundColor: '#00000080', marginLeft: 40 } }>
        { program && program.weekOne && clientProfile && program.weekTwo && program.weekThree && program.weekFour &&
          <table className="program-container" style={ { color: '#fff', width: '45vw', borderCollapse: 'collapse', maxHeight: '80vh', minHeight: '50vh', } }>
            { days.map((day) => (
              <Fragment key={ shortid.generate() }>
                <thead>
                  <tr>
                    <th colSpan="6" style={ { paddingTop: '1.5em' } }>Week 1 - Day { `${day}` }</th>
                  </tr>
                  <tr style={ { textAlign: 'center' } }>
                    <th>Exercises</th>
                    <th colSpan="2">Load kg (min-max)</th>
                    <th colSpan="2">Reps (min-max)</th>
                    <th>Sets</th>
                  </tr>
                </thead>
                <tbody>
                  { program.weekOne.map((item) =>
                    item.filter((inner) => inner.day === day).map((inner) => (
                      <tr key={ inner.id } style={ { textAlign: 'center', marginBottom: '3em', fontSize: 14 } }>
                        <td>{ inner.exercise }</td>
                        <td>{ inner.min }</td>
                        <td>{ inner.max }</td>
                        <td>{ inner.repsMin }</td>
                        <td>{ inner.repsMax }</td>
                        <td>{ inner.sets }</td>
                      </tr>
                    ))
                  )
                  }

                </tbody>
              </Fragment>
            ))
            }
            { days.map((day) => (
              <Fragment key={ shortid.generate() }>
                <thead>
                  <tr>
                    <th colSpan="6" style={ { paddingTop: '1.5em' } }>Week 2 - Day { `${day}` }</th>
                  </tr>
                  <tr style={ { textAlign: 'center' } }>
                    <th>Exercises</th>
                    <th colSpan="2">Load kg (min-max)</th>
                    <th colSpan="2">Reps (min-max)</th>
                    <th>Sets</th>
                  </tr>
                </thead>
                <tbody>
                  { program.weekTwo.map((item) =>
                    item.filter((inner) => inner.day === day).map((inner, idx) => (
                      <tr key={ inner.id } style={ { textAlign: 'center', marginBottom: '3em', fontSize: 14 } }>
                        <td>{ inner.exercise }</td>
                        <td>{ inner.min }</td>
                        <td>{ inner.max }</td>
                        <td>{ inner.repsMin }</td>
                        <td>{ inner.repsMax }</td>
                        <td>{ inner.sets }</td>
                      </tr>
                    ))
                  )
                  }

                </tbody>
              </Fragment>
            ))
            }
            { days.map((day) => (
              <Fragment key={ shortid.generate() }>
                <thead>
                  <tr>
                    <th colSpan="6" style={ { paddingTop: '1.5em' } }>Week 3 - Day { `${day}` }</th>
                  </tr>
                  <tr style={ { textAlign: 'center' } }>
                    <th>Exercises</th>
                    <th colSpan="2">Load kg (min-max)</th>
                    <th colSpan="2">Reps (min-max)</th>
                    <th>Sets</th>
                  </tr>
                </thead>
                <tbody>
                  { program.weekThree.map((item) =>
                    item.filter((inner) => inner.day === day).map((inner) => (
                      <tr key={ inner.id } style={ { textAlign: 'center', marginBottom: '3em', fontSize: 14 } }>

                        <td>{ inner.exercise }</td>
                        <td>{ inner.min }</td>
                        <td>{ inner.max }</td>
                        <td>{ inner.repsMin }</td>
                        <td>{ inner.repsMax }</td>
                        <td>{ inner.sets }</td>
                      </tr>
                    ))
                  )
                  }

                </tbody>
              </Fragment>
            ))
            }
            { days.map((day) => (
              <Fragment key={ shortid.generate() }>
                <thead>
                  <tr>
                    <th colSpan="6" style={ { paddingTop: '1.5em' } }>Week 4 - Day { `${day}` }</th>
                  </tr>
                  <tr style={ { textAlign: 'center' } }>
                    <th>Exercises</th>
                    <th colSpan="2">Load kg (min-max)</th>
                    <th colSpan="2">Reps (min-max)</th>
                    <th>Sets</th>
                  </tr>
                </thead>
                <tbody>
                  { program.weekFour.map((item) =>
                    item.filter((inner) => inner.day === day).map((inner) => (
                      <tr key={ inner.id } style={ { textAlign: 'center', marginBottom: '3em', fontSize: 14 } }>

                        <td>{ inner.exercise }</td>
                        <td>{ inner.min }</td>
                        <td>{ inner.max }</td>
                        <td>{ inner.repsMin }</td>
                        <td>{ inner.repsMax }</td>
                        <td>{ inner.sets }</td>
                      </tr>
                    ))
                  )
                  }

                </tbody>
              </Fragment>
            ))
            }

          </table>
        }
      </div>
      { program.volumeChart &&
        <VolumeChart volumeChart={ program.volumeChart } />
      }

    </>
  );
};
ShowClientPrograms.propTypes = {
  getClientProgramById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile
});
export default connect(mapStateToProps, { getClientProgramById })(ShowClientPrograms);
