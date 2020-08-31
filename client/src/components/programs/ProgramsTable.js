import React from 'react';
import shortid from 'shortid';
import { makeStyles } from '@material-ui/core/styles';
import {
  // MenuItem,
  // Checkbox,
  // ListItemText,
  // Select,
  // InputLabel,
  // Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';


const useStyles = makeStyles({
  table: {
    width: 500,
  },

});

function createData(item) {
  return { item };
}

const ProgramsTable = (props) => {
  const classes = useStyles();
  const {
    days,
    exercises,
    programs,
    setPrograms,
  } = props;

  const rows = [];
  for (let i = 0;i < parseInt(days);i += 1) {
    rows.push(createData(`Day ${i + 1}`));
  }
  const handleChangeMultiple = (event, idx) => {
    const { options } = event.target;
    const value = [];
    const tempPrograms = [...programs];
    for (let i = 0, l = options.length;i < l;i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    tempPrograms[props.index].exerciseList[0][idx.toString()] = value;
    setPrograms(tempPrograms);
  };

  return (
    <>
      <TableContainer component={ Paper } style={ { width: 500, marginLeft: 50, marginBottom: 30 } }>
        <Table className={ classes.table } size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Week</TableCell>
              <TableCell align="left">Days</TableCell>
              <TableCell align="left">Exercises</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { rows.map((row, idx) => (
              <TableRow key={ shortid.generate() }>
                { (idx < 1) ?
                  <TableCell>{ `${props.index + 1}` }</TableCell>
                  :
                  <TableCell>{ ' ' }</TableCell>
                }
                <TableCell component="th" scope="row">
                  { row.item }
                </TableCell>
                <TableCell>
                  <select name="exercises" className="exercises-slct" multiple onChange={ (e) => handleChangeMultiple(e, idx) } value={ programs[props.index].exerciseList[0][idx.toString()] }>
                    {
                      exercises.map((ex) =>
                        <option value={ `${ex.exercise}` } key={ `${ex._id}` }>{ ex.exercise }</option>
                      )
                    }
                  </select>

                  {/* <InputLabel id="multiple-checkbox-label">exercises</InputLabel>
                  <Select
                    labelId="multiple-checkbox-label"
                    id="multiple-checkbox"
                    multiple={ true }
                    name="exercises"
                    value={ exerciseList[0][idx.toString()] }
                    input={ <Input id="multiple-checkbox-label" /> }
                    onChange={ (e) => {
                      console.log(e.target);
                      handleChangeMultiple(e, idx);
                    } }
                    renderValue={ (selected) => selected.join(', ') }
                    style={ { width: 250 } }
                  >
                    {
                      exercises.map((ex) =>
                        <MenuItem value={ `${ex.exercise}` } key={ `${ex._id}` } >
                          <Checkbox checked={ (exerciseList[0][idx.toString()]).indexOf(`${ex.exercise}`) > -1 } />
                          <ListItemText primary={ `${ex.exercise}` } />
                        </MenuItem>
                      )
                    }
                  </Select> */}
                </TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
      {/* <pre style={ { color: '#fff', marginLeft: 1400, marginTop: -200 } }>{ JSON.stringify(exerciseList, null, 2) }</pre> */ }
    </>
  );
};

export default ProgramsTable;
