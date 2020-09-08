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
    { dataField: 'exercise', text: 'Exercises' },
    { dataField: 'min', text: 'Load min(kg)', csvType: Number },
    { dataField: 'max', text: 'Load max(kg)', csvType: Number },
    { dataField: 'repsMin', text: 'Reps min', csvType: Number },
    { dataField: 'repsMax', text: 'Reps max', csvType: Number },
    { dataField: 'sets', text: 'Sets', csvType: Number },
  ];
  console.log(program.month);

  return (
    <>
      {
        program && program.month && clientProfile &&
        <ToolkitProvider
          keyField="id"
          columns={ columns }
          data={ program.month }
          exportCSV={ {
            fileName: `${clientProfile.clientFirstName}_${program.clientDetails.month}_${program.clientDetails.year}.csv`,
            separator: '|',
            noAutoBOM: false
          } }
        >
          {
            (props) => (
              <>
                <MyExportCSV  { ...props.csvProps }>Export CSV</MyExportCSV>
                <br />
                <BootstrapTable
                  { ...props.baseProps }
                  bordered={ false }
                />
              </>
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
