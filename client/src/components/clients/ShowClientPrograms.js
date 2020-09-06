import React, { useState } from 'react';
import shortid from 'shortid';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

const ShowClientPrograms = ({ program }) => {
  // const temp = [program];

  // const columns = [
  //   {
  //     dataField: 'program.percentages',
  //     text: 'percentages'
  //   },

  // ];
  console.log(program);
  return (
    <div></div>
    // <BootstrapTable
    //   keyField={ `${shortid.generate()}` }
    //   data={ temp }
    //   columns={ columns }
    //   striped
    //   hover
    //   condensed
    // />
  );
};

export default ShowClientPrograms;
