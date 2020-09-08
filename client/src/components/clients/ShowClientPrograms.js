import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

const ShowClientPrograms = ({ profile: { clientProfile, program } }) => {
  const [days, setDays] = useState({
    id: shortid.generate(),
    dayOne: '',
    dayTwo: '',
    dayThree: '',
    dayFour: '',
    dayFive: '',
    daySix: '',
    daySeven: '',
  });


  if (Array.isArray(program.weekOne)) {
    if (Array.isArray(program.weekOne[0])) {
      days.dayOne = program.weekOne[0];
    }
    if (Array.isArray(program.weekOne[1])) {
      days.dayTwo = program.weekOne[1];
    }
    if (Array.isArray(program.weekOne[2])) {
      days.dayThree = program.weekOne[2];
    }
    if (Array.isArray(program.weekOne[3])) {
      days.dayFour = program.weekOne[3];
    }
    if (Array.isArray(program.weekOne[4])) {
      days.dayFive = program.weekOne[4];
    }
    if (Array.isArray(program.weekOne[5])) {
      days.daySeven = program.weekOne[5];
    }
    if (Array.isArray(program.weekOne[6])) {
      days.daySeven = program.weekOne[6];
    }
  }

  // const columns = [
  //   { dataField: 'exercise', text: 'Exercises' },
  //   { dataField: 'min', text: 'Load min(kg)' },
  //   { dataField: 'max', text: 'Load max(kg)' },
  //   { dataField: 'repsMin', text: 'Reps min' },
  //   { dataField: 'repsMax', text: 'Reps max' },
  //   { dataField: 'sets', text: 'Sets' },
  // ];
  // console.log(days.dayOne[0]);

  return (
    <div style={ { color: '#fff' } }>
      {/* <BootstrapTable
        keyField="id"
        data={ days.dayOne }
        columns={ columns }
        striped
        hover
        condensed
      /> */}
    </div>

  );
};

ShowClientPrograms.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile
});
export default connect(mapStateToProps)(ShowClientPrograms);
