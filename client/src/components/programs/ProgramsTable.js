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
    width: '50vw',
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
  } = props;

  const rows = [];
  for (let i = 0;i < parseInt(days);i += 1) {
    rows.push(createData(`Day ${i + 1}`));
  }
  // const handleChangeMultiple = (event, idx) => {
  //   const { options } = event.target;
  //   const value = [];
  //   const tempPrograms = [...programs];
  //   for (let i = 0, l = options.length;i < l;i += 1) {
  //     if (options[i].selected) {
  //       value.push(options[i].value);
  //     }
  //   }
  //   tempPrograms[props.index].exerciseList[0][idx.toString()] = value;
  //   setPrograms(tempPrograms);
  // };
  const handleChangeMultipleAuto = (event, value, idx) => {
    const values = [];
    value.map((v) => values.push({ exercise: v.exercise, min: v.min, max: v.max, factor: v.factor }));
    const tempPrograms = [...programs];
    tempPrograms[props.index].exerciseList[0][idx.toString()] = values;
  };

  return (
    <>
      <TableContainer component={ Paper } style={ { width: '50vw', marginLeft: 20, marginBottom: 30, overflow: 'auto' } }>
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
                <TableCell>Week { `${props.index + 1}` }</TableCell>
                <TableCell component="th" scope="row">
                  { row.item }
                </TableCell>
                <TableCell>
                  {/* <select
                    name="exercises"
                    className="exercises-slct"
                    multiple
                    onChange={ (e) => handleChangeMultiple(e, idx) } value={ programs[props.index].exerciseList[0][idx.toString()] }
                    size={ 7 }
                  >
                    {
                      exercises.map((ex) =>
                        <option value={ `${ex.exercise}` } key={ `${ex._id}` }>{ ex.exercise }</option>
                      )
                    }
                  </select> */}
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
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProgramsTable;
