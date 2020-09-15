import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfiles, getEstimates } from '../../actions/profile';
import { getExercises, } from '../../actions/exercise';
import { insertProgram } from '../../actions/programs';
import CustomAlert from '../layout/CustomAlert';
import shortid from 'shortid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
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


const days = [1, 2, 3, 4, 5, 6, 7];

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const years = [];
for (let i = 2020;i < 2051;i += 1) {
  years.push(i);
}

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

const CreatePrograms = ({ getAllProfiles, insertProgram, getExercises, getEstimates, profile: { clientProfiles, exerciseList }, exercises: { exercises } }) => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    client: '',
    month: '',
    year: '',
    daysPerWeek: 0,
    level: '',
  });
  const [programs, setPrograms] = useState([
    {
      percentages: '',
      repsMin: [],
      repsMax: [],
      sets: [],
      exerciseList: [{
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
      }],
    },
    {
      percentages: '',
      repsMin: [],
      repsMax: [],
      sets: [],
      exerciseList: [{
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
      }],
    },
    {
      percentages: '',
      repsMin: [],
      repsMax: [],
      sets: [],
      exerciseList: [{
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
      }],
    },
    {
      percentages: '',
      repsMin: [],
      repsMax: [],
      sets: [],
      exerciseList: [{
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
      }],
    },
  ],
  );


  const {
    client,
    month,
    year,
    daysPerWeek,
    level
  } = formData;

  const {
    repsMin,
    repsMax,
    sets,
  } = programs;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangePrograms = (idx, e) => {
    const values = [...programs];
    values[idx][e.target.name] = e.target.value;
    setPrograms(values);
    setFormData({ ...formData, programs });
  };


  const rows = [];
  for (let i = 0;i < parseInt(daysPerWeek);i += 1) {
    rows.push(createData(`Day ${i + 1}`));
  }

  const handleChangeMultipleAuto = (event, value, idx, index) => {
    const values = [];
    value.map((v) => values.push({ exercise: v.exercise, min: v.min, max: v.max, factor: v.factor }));
    const tempPrograms = [...programs];
    tempPrograms[index].exerciseList[0][idx.toString()] = values;
    // setPrograms(tempPrograms);
  };

  const onChangeExtra = (e, idx, index) => {
    const values = [...programs];
    console.log(e.target.value);
    const newItem = e.target.value;
    values[index][e.target.name][idx.toString()] = newItem;
    setPrograms(values);
  };

  useEffect(() => {
    getAllProfiles();
    getExercises();
  }, [getAllProfiles, getExercises]);

  useEffect(() => {
    getEstimates(formData, client);
  }, [formData.level, client]);

  const onSubmit = (e) => {
    e.preventDefault();
    insertProgram(formData);
    setFormData({
      client: '',
      month: '',
      year: '',
      daysPerWeek: 0,
      level: '',
    });
    setPrograms([
      {
        percentages: '',
        repsMin: [],
        repsMax: [],
        sets: [],
        exerciseList: [{
          0: [],
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
        }],
      },
      {
        percentages: '',
        repsMin: [],
        repsMax: [],
        sets: [],
        exerciseList: [{
          0: [],
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
        }],
      },
      {
        percentages: '',
        repsMin: [],
        repsMax: [],
        sets: [],
        exerciseList: [{
          0: [],
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
        }],
      },
      {
        percentages: '',
        repsMin: [],
        repsMax: [],
        sets: [],
        exerciseList: [{
          0: [],
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
        }],
      },
    ]);
    setVisible(!visible);
  };

  return (
    <>
      <div className="alerts" style={ { position: 'absolute', marginLeft: 500 } }>
        <CustomAlert />
      </div>
      <form className="program-form" onSubmit={ (e) => onSubmit(e) }>
        <label style={ { paddingLeft: '20px' } }>
          <select name="client" onChange={ (e) => onChange(e) } value={ client } style={ { color: '#000', fontSize: 14, marginTop: 5, padding: '0.15em', borderRadius: '0.3em', marginRight: 15 } } required>
            <option value="">Client</option>
            {
              clientProfiles.map((profile) =>
                <option value={ `${profile._id}` } key={ shortid.generate() }>{ profile.clientFirstName } { profile.clientLastName }</option>
              )
            }
          </select>
          <select name="month" onChange={ (e) => onChange(e) } value={ month } style={ { color: '#000', fontSize: 14, marginTop: 5, padding: '0.15em', borderRadius: '0.3em', marginRight: 15 } } required>
            <option value="">Month</option>
            {
              months.map((month) =>
                <option value={ `${month}` } key={ shortid.generate() }> { month }</option>
              )
            }
          </select>
          <select name="year" onChange={ (e) => onChange(e) } value={ year } style={ { color: '#000', fontSize: 14, marginTop: 5, padding: '0.15em', borderRadius: '0.3em', marginRight: 15 } } required>
            <option value="">Year</option>
            {
              years.map((year) =>
                <option value={ `${year}` } key={ shortid.generate() }> { year }</option>
              )
            }
          </select>
          <select name="daysPerWeek" onChange={ (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
            setVisible(true);
          } } value={ daysPerWeek } style={ { color: '#000', fontSize: 14, marginTop: 5, padding: '0.15em', borderRadius: '0.3em', marginRight: 15 } } required>
            <option value="">Days</option>
            {
              days.map((day) =>
                <option value={ `${day}` } key={ shortid.generate() }> { day }</option>
              )
            }
          </select>
          <select name="level" onChange={ (e) => onChange(e) } value={ level } style={ { color: '#000', fontSize: 14, marginTop: 5, padding: '0.15em', borderRadius: '0.3em' } }>
            <option value="0">Level 0</option>
            <option value="0.6">Level 1</option>
            <option value="0.75">Level 2</option>
            <option value="0.9">Level 3</option>
            <option value="1">Level 4</option>
            <option value="1.1">Level 5</option>
          </select>
        </label>
        <table className="tbl" style={ {
          display: 'flex', flexDirection: 'column', maxWidth: '25vw', justifyContent: 'space-between', alignContent: 'stretch', alignItems: 'stretch', marginLeft: 20, flexWrap: 'wrap',
        } }>
          <thead>
            <tr>
              <th style={ { color: '#93aabd', fontSize: 20 } } colSpan="2">Percentages</th>
            </tr>
          </thead>
          { programs && programs.map((data, idx) => (
            <tbody key={ idx } style={ { display: 'flex', flexDirection: 'column', maxWidth: '25vw', justifyContent: 'space-around', alignContent: 'stretch', alignItems: 'stretch' } }>
              <tr>
                <td style={ { color: '#93aabd', fontSize: 15 } }> { `${idx + 1}` }</td>
                <td style={ { paddingRight: '2.6em', paddingLeft: '2em' } }>
                  <input
                    type="text"
                    className="form-input"
                    style={ { width: '50px' } }
                    name="percentages"
                    value={ data.percentages }
                    onChange={ (e) => onChangePrograms(idx, e) }
                    required />
                </td>

              </tr>
            </tbody>
          )) }
        </table>
        <button
          style={ { marginLeft: 170, marginTop: -143, width: 20, backgroundColor: 'transparent', border: 0, outline: 'none' } }
          type="submit"
          className="button-add"
          value="Next"><i className="fas fa-angle-double-right" style={ { width: 20, fontSize: 20, paddingRight: '0.25em' } }></i> </button>
      </form>
      <div className="inner-table">
        { visible && exercises && programs && programs.map((data, index) => (
          <TableContainer key={ shortid.generate() } component={ Paper } style={ { width: '70vw', marginLeft: 20, marginBottom: 30, overflow: 'auto' } }>
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
                  <Fragment key={ shortid.generate() }>
                    <TableRow >
                      <TableCell>Week { `${index + 1}` }</TableCell>
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
                            handleChangeMultipleAuto(e, value, idx, index);
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
                          key={ `${exercises[2]._id}` }
                          id="outlined-basic"
                          variant="outlined"
                          name="repsMin"
                          defaultValue={ repsMin }
                          onChange={ (e) => onChangeExtra(e, idx, index) }
                          style={ { width: 70 } }
                        />
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          key={ `${exercises[3]._id}` }
                          id="outlined-basic"
                          variant="outlined"
                          name="repsMax"
                          defaultValue={ repsMax }
                          onChange={ (e) => onChangeExtra(e, idx, index) }
                          style={ { width: 70 } }
                        />
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          key={ `${exercises[4]._id}` }
                          id="outlined-basic"
                          variant="outlined"
                          name="sets"
                          defaultValue={ sets }
                          onChange={ (e) => onChangeExtra(e, idx, index) }
                          style={ { width: 70 } }
                        />
                      </TableCell>
                    </TableRow>
                  </Fragment>
                )) }
              </TableBody>
            </Table>
          </TableContainer>

        ))
        }
      </div>
      <pre style={ { color: 'pink', marginLeft: 0 } }>{ JSON.stringify(programs, null, 2) }</pre>
    </>
  );
};

CreatePrograms.propTypes = {
  getExercises: PropTypes.func.isRequired,
  getAllProfiles: PropTypes.func.isRequired,
  getEstimates: PropTypes.func.isRequired,
  insertProgram: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  programs: PropTypes.object.isRequired,
  exercises: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  programs: state.programs,
  exercises: state.exercises,
});

export default connect(mapStateToProps, { getAllProfiles, getExercises, insertProgram, getEstimates })(CreatePrograms);

