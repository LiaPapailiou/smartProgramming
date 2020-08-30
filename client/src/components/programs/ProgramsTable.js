import React, { useState } from 'react';
import shortid from 'shortid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
  table: {
    width: 800,
  },

});

function createData(item) {
  return { item };
}

const ProgramsTable = (props) => {
  const [exerciseList, setExerciseList] = useState([{
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  }]);
  const classes = useStyles();
  const { days, exercises } = props;

  const rows = [];
  for (let i = 0;i < parseInt(days);i += 1) {
    rows.push(createData(`Day ${i + 1}`));
  }
  const handleChangeMultiple = (event, idx) => {
    const { options } = event.target;
    const value = [];
    const temp = [...exerciseList];
    for (let i = 0, l = options.length;i < l;i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    temp[0][idx.toString()] = value;
    setExerciseList(temp);
  };
  // console.log(props);
  return (
    <>
      <TableContainer component={ Paper } style={ { width: 800, marginLeft: 240 } }>
        <Table className={ classes.table } size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Days</TableCell>
              <TableCell align="left">Exercises</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { rows.map((row, idx) => (
              <TableRow key={ shortid.generate() }>
                <TableCell component="th" scope="row">
                  { row.item }
                </TableCell>
                <TableCell>
                  <select name="exercises" style={ { fontSize: 14, marginTop: 5, padding: '0.15em', borderRadius: '0.3em', marginRight: 20, border: 0, outline: 0, width: 250, appearance: 'menulist' } } multiple onChange={ (e) => handleChangeMultiple(e, idx) } value={ exerciseList[0][idx.toString()] }>
                    {
                      exercises.map((ex) =>
                        <option value={ `${ex.exercise}` } key={ `${ex._id}` }>{ ex.exercise }</option>
                      )
                    }
                  </select>

                </TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
      <pre style={ { color: '#fff', marginLeft: 1000 } }>{ JSON.stringify(exerciseList, null, 2) }</pre>
    </>
  );
};

export default ProgramsTable;
