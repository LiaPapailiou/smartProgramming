import React from 'react';
import shortid from 'shortid';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Table,
  TableBody,
  TableCell,
  TextField,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';



const useStyles = makeStyles({
  table: {
    width: '70vw',
    marginBottom: 5
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
});

function createData(item) {
  return { item };
}

const ProgramsTable = (props) => {
  const classes = useStyles();
  const {
    days,
    exerciseList,
    programs,
    repsMin,
    repsMax,
    sets,
    setPrograms,
  } = props;

  const rows = [];
  for (let i = 0;i < parseInt(days);i += 1) {
    rows.push(createData(`Day ${i + 1}`));
  }

  const handleChangeMultipleAuto = (event, value, idx) => {
    const values = [];
    value.map((v) => values.push({ exercise: v.exercise, min: v.min, max: v.max, factor: v.factor }));
    const tempPrograms = [...programs];
    tempPrograms[props.index].exerciseList[0][idx.toString()] = values;
  };

  const onChange = (e, idx) => {
    const values = [...programs];
    console.log(e.target.value);
    values[props.index][e.target.name][idx.toString()] = e.target.value;
    setPrograms(values);
  };

  // console.log(valueRepsMin);
  return (
    <>
      <TableContainer component={ Paper } style={ { width: '70vw', marginLeft: 20, marginBottom: 30, overflow: 'auto' } }>
        <Table className={ classes.table } size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Week</TableCell>
              <TableCell align="left">Days</TableCell>
              <TableCell align="left">Exercises</TableCell>
              <TableCell align="center">Reps min</TableCell>
              <TableCell align="center">Reps max</TableCell>
              <TableCell align="center">Sets</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { rows.map((row, idx) => (
              <TableRow key={ shortid.generate() }>
                <TableCell>Week { `${props.index + 1}` }</TableCell>
                <TableCell component="th" scope="row">
                  { row.item }
                </TableCell>
                <TableCell>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={ exerciseList }
                    getOptionLabel={ (option) => option.exercise }
                    filterSelectedOptions
                    onChange={ (e, value) => {
                      handleChangeMultipleAuto(e, value, idx);
                    } }
                    renderInput={ (params) => (
                      <TextField
                        { ...params }
                        variant="outlined"
                        label="exercises"
                      />
                    ) }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    key={ shortid.generate() }
                    id="outlined-basic"
                    variant="outlined"
                    name="repsMin"
                    value={ repsMin }
                    onChange={ (e) => onChange(e, idx) }
                    style={ { width: 70 } }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    key={ shortid.generate() }
                    id="outlined-basic"
                    variant="outlined"
                    name="repsMax"
                    value={ repsMax }
                    onChange={ (e) => onChange(e, idx, row) }
                    style={ { width: 70 } }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    key={ shortid.generate() }
                    id="outlined-basic"
                    variant="outlined"
                    name="sets"
                    value={ sets }
                    onChange={ (e) => onChange(e, idx) }
                    style={ { width: 70 } }
                  />
                </TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>

    </>
  );
};

export default ProgramsTable;
