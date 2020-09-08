import React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

const ShowClientPrograms = (props) => {
  // let programs;
  // if (Array.isArray(program.weekOne)) {
  //   programs = [props.program.weekOne];
  // }

  // const columns = [
  //   { dataField: 'day', text: 'Day' },
  //   { dataField: 'exercise', text: 'Exercises' },
  //   { dataField: 'min', text: 'Load min(kg)' },
  //   { dataField: 'max', text: 'Load max(kg)' },
  //   { dataField: 'repsMin', text: 'Reps min' },
  //   { dataField: 'repsMax', text: 'Reps max' },
  //   { dataField: 'sets', text: 'Sets' },
  // ];
  console.log(props);

  return (
    <div style={ { color: '#fff' } }>
      {/* <BootstrapTable
        keyField="id"
        data={ programs }
        columns={ columns }
        striped
        hover
        condensed
      /> */}
    </div>

  );
};

export default ShowClientPrograms;
