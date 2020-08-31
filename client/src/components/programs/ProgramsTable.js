import React from 'react';
import shortid from 'shortid';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  // MenuItem,
  // Checkbox,
  // ListItemText,
  // Select,
  // InputLabel,
  // Chip,
  TextField,
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
    exercises,
    programs,
    setPrograms,
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
    value.map((v) => values.push(v.exercise));
    const tempPrograms = [...programs];
    tempPrograms[props.index].exerciseList[0][idx.toString()] = values;

    console.log(tempPrograms);
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
                  {/* <select name="exercises" className="exercises-slct" multiple onChange={ (e) => handleChangeMultiple(e, idx) } value={ programs[props.index].exerciseList[0][idx.toString()] }>
                    {
                      exercises.map((ex) =>
                        <option value={ `${ex.exercise}` } key={ `${ex._id}` }>{ ex.exercise }</option>
                      )
                    }
                  </select> */}
                  {/* 
                  <InputLabel id="multiple-checkbox-label">exercises</InputLabel>
                  <Select
                    labelId="multiple-checkbox-label"
                    id="multiple-checkbox"
                    multiple={ true }
                    value={ programs[props.index].exerciseList[0][idx.toString()] }
                    onChange={ (e) => {
                      console.log(e.target);
                      handleChangeMultiple(e, idx);
                    } }
                    // renderValue={ (selected) => selected.join(', ') }
                    renderValue={ (selected) => (
                      <div className={ classes.chips }>
                        { selected.map((value) => (
                          <Chip key={ value } label={ value } className={ classes.chip } />
                        )) }
                      </div>
                    ) }
                    style={ { width: 250 } }
                  >
                    {
                      exercises.map((ex) =>
                        <MenuItem value={ ex.exercise } key={ `${ex._id}` } >
                          <Checkbox checked={ programs[props.index].exerciseList[0][idx.toString()].indexOf(`${ex.exercise}`) > -1 } />
                          <ListItemText primary={ `${ex.exercise}` } />
                        </MenuItem>
                      )
                    }
                  </Select> */}
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={ exercises }
                    getOptionLabel={ (option) => option.exercise }
                    // defaultValue={ [exercises[0]] }
                    filterSelectedOptions
                    onChange={ (e, value) => {
                      handleChangeMultipleAuto(e, value, idx);
                    } }
                    renderInput={ (params) => (
                      <TextField
                        { ...params }
                        variant="outlined"
                        label="exercises"
                        placeholder="exercises"
                      />
                    ) }
                  />
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
