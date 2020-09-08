import React, { useEffect } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getClientProgramById } from '../../actions/profile';
import BootstrapTable from 'react-bootstrap-table-next';

const ShowClientPrograms = ({ programId, getClientProgramById, profile: { program } }) => {

  useEffect(() => {
    getClientProgramById(programId);
  }, [programId]);
  // let programs;
  // if (Array.isArray(program.weekOne)) {
  //   programs = [props.program.weekOne];
  // }

  const columns = [
    { dataField: 'day', text: 'Day' },
    { dataField: 'exercise', text: 'Exercises' },
    { dataField: 'min', text: 'Load min(kg)' },
    { dataField: 'max', text: 'Load max(kg)' },
    { dataField: 'repsMin', text: 'Reps min' },
    { dataField: 'repsMax', text: 'Reps max' },
    { dataField: 'sets', text: 'Sets' },
  ];
  console.log(program);

  return (
    <div style={ { color: '#fff' } }>
      { program.weekOne &&
        <BootstrapTable
          keyField="id"
          data={ program.weekOne }
          columns={ columns }
          striped
          hover
          condensed
        />
      }
      { program.weekTwo &&
        <BootstrapTable
          keyField="id"
          data={ program.weekTwo }
          columns={ columns }
          striped
          hover
          condensed
        />
      }
      { program.weekThree &&
        <BootstrapTable
          keyField="id"
          data={ program.weekThree }
          columns={ columns }
          striped
          hover
          condensed
        />
      }
      { program.weekFour &&
        <BootstrapTable
          keyField="id"
          data={ program.weekFour }
          columns={ columns }
          striped
          hover
          condensed
        />
      }
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
