import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getClientProgramById } from '../../actions/profile';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
// import ToolkitProvider from 'react-bootstrap-table2-toolkit';
// import BootstrapTable from 'react-bootstrap-table-next';
import shortid from 'shortid';


// const MyExportCSV = (props) => {
//   const handleClick = () => {
//     props.onExport();
//   };
//   return (
//     <div>
//       <button className="input-add" onClick={ handleClick }>Export to CSV</button>
//     </div>
//   );
// };
const weeks = [1, 2, 3, 4];
const ShowClientPrograms = ({ programId, getClientProgramById, profile: { program, clientProfile } }) => {

  useEffect(() => {
    getClientProgramById(programId);
  }, [programId]);

  // const columns = [
  //   { dataField: 'week', text: 'Week' },
  //   { dataField: 'day', text: 'Day', csvType: Number },
  //   { dataField: 'exercise', text: 'Exercises', csvType: String },
  //   { dataField: 'min', text: 'Load min(kg)', csvType: Number },
  //   { dataField: 'max', text: 'Load max(kg)', csvType: Number },
  //   { dataField: 'repsMin', text: 'Reps min', csvType: Number },
  //   { dataField: 'repsMax', text: 'Reps max', csvType: Number },
  //   { dataField: 'sets', text: 'Sets', csvType: Number },
  // ];
  // const rowStyle = { backgroundColor: '#E1F5E3', padding: '0', borderCollapse: 'collapse' };

  let daysPerWeek;
  let days = [];
  if (program.clientDetails !== undefined) {
    daysPerWeek = program.clientDetails.daysPerWeek;
  }

  for (let i = 1;i < daysPerWeek + 1;i += 1) {
    days.push(i);
  }

  return (
    <div className="table-wrapper" style={ { width: '46vw', maxHeight: '70vh', backgroundColor: '#00000080', borderCollapse: 'collapse', marginLeft: 500, } }>
      { program && program.weekOne && clientProfile && program.weekTwo && program.weekThree && program.weekFour &&
        <table className="program-container" style={ { color: '#fff', width: '45vw' } }>
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
                    <tr key={ inner.id } style={ { textAlign: 'center', marginBottom: '3em' } }>

                      <td>{ inner.exercise }</td>
                      <td>{ inner.min }</td>
                      <td>{ inner.max }</td>
                      <td>{ inner.repsMin }</td>
                      <td>{ inner.repsMax }</td>
                      <td>{ inner.sets }</td>
                      <td><br /></td>
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
                  item.filter((inner) => inner.day === day).map((inner) => (
                    <tr key={ inner.id } style={ { textAlign: 'center', marginBottom: '3em' } }>
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
                    <tr key={ inner.id } style={ { textAlign: 'center', marginBottom: '3em' } }>

                      <td>{ inner.exercise }</td>
                      <td>{ inner.min }</td>
                      <td>{ inner.max }</td>
                      <td>{ inner.repsMin }</td>
                      <td>{ inner.repsMax }</td>
                      <td>{ inner.sets }</td>
                      <td><br /></td>
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
                    <tr key={ inner.id } style={ { textAlign: 'center', marginBottom: '3em' } }>

                      <td>{ inner.exercise }</td>
                      <td>{ inner.min }</td>
                      <td>{ inner.max }</td>
                      <td>{ inner.repsMin }</td>
                      <td>{ inner.repsMax }</td>
                      <td>{ inner.sets }</td>
                      <td><br /></td>
                    </tr>
                  ))
                )
                }

              </tbody>
            </Fragment>
          ))
          }
          {/* // { weeks.map((week, idx) => (
          //   <Fragment key={ shortid.generate() }>
          //     <thead>
          //       <tr>
          //         <th colSpan="7">Week { `${idx + 1}` }</th>
          //       </tr>
          //       <tr style={ { textAlign: 'center' } }>
          //         <th>Day</th>
          //         <th>Exercises</th>
          //         <th colSpan="2">Load kg (min-max)</th>
          //         <th colSpan="2">Reps (min-max)</th>
          //         <th>Sets</th>
          //       </tr>
          //     </thead>
          //     <tbody>
          //       { program.month.filter((item) => item.week === idx + 1).map((item) => (
          //         <tr key={ item.id } style={ { textAlign: 'center' } }>
          //           <td>{ item.day }</td>
          //           <td>{ item.exercise }</td>
          //           <td>{ item.min }</td>
          //           <td>{ item.max }</td>
          //           <td>{ item.repsMin }</td>
          //           <td>{ item.repsMax }</td>
          //           <td>{ item.sets }</td>
          //         </tr>
          //       ))
          //       }
          //     </tbody>
          //   </Fragment>
          // )) } */}
        </table>
      }
      {/* {
        program && program.month && clientProfile &&
        <ToolkitProvider
          keyField="id"
          columns={ columns }
          data={ program.month }
          bordered={ false }
          exportCSV={ {
            fileName: `${clientProfile.clientFirstName}_${program.clientDetails.month}_${program.clientDetails.year}.csv`,
            separator: '|',
            noAutoBOM: false
          } }
        >
          {
            (props) => (
              <div className="bootstrap-table-wrapper" style={ { backgroundColor: 'transparent', display: 'flex', flexDirection: 'column', overflow: 'auto', maxWidth: '50vw', maxHeight: '80vh', justifyContent: 'center', alignItems: 'center', marginLeft: 400, fontSize: 14, color: '#000' } }>
                <MyExportCSV  { ...props.csvProps }>Export CSV</MyExportCSV>
                <br />
                <BootstrapTable
                  bootstrap4
                  striped
                  rowStyle={ rowStyle }
                  { ...props.baseProps }
                />


              </div>
            )
          }
        </ToolkitProvider>
      } */}
    </div>
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
