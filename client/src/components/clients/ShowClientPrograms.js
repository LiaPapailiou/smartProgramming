import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getClientProgramById } from '../../actions/profile';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';

const MyExportCSV = (props) => {
  const handleClick = () => {
    props.onExport();
  };
  return (
    <div>
      <button className="input-add" onClick={ handleClick }>Export to CSV</button>
    </div>
  );
};
const ShowClientPrograms = ({ programId, getClientProgramById, profile: { program, clientProfile } }) => {

  useEffect(() => {
    getClientProgramById(programId);
  }, [programId]);

  const columns = [
    { dataField: 'week', text: 'Week' },
    { dataField: 'day', text: 'Day', csvType: Number },
    { dataField: 'exercise', text: 'Exercises', csvType: String },
    { dataField: 'min', text: 'Load min(kg)', csvType: Number },
    { dataField: 'max', text: 'Load max(kg)', csvType: Number },
    { dataField: 'repsMin', text: 'Reps min', csvType: Number },
    { dataField: 'repsMax', text: 'Reps max', csvType: Number },
    { dataField: 'sets', text: 'Sets', csvType: Number },
  ];
  console.log(program.month);
  const rowStyle = { backgroundColor: '#transparent', padding: '0', borderCollapse: 'collapse' };
  return (
    <>
      {
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
              <div style={ { backgroundColor: 'transparent', display: 'flex', flexDirection: 'column', overflow: 'auto', maxWidth: '50vw', maxHeight: '80vh', justifyContent: 'center', alignItems: 'center', marginLeft: 500, marginTop: 80 } }>
                <BootstrapTable
                  bootstrap4
                  striped
                  rowStyle={ rowStyle }
                  { ...props.baseProps }
                />
                <br />
                <MyExportCSV  { ...props.csvProps }>Export CSV</MyExportCSV>
              </div>
            )
          }
        </ToolkitProvider>
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
