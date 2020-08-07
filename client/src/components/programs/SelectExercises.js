import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProgram, addExercisesAndDays } from '../../actions/programs';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
//  import Autocomplete from '@material-ui/lab/Autocomplete';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      backgroundColor: 'white',
      color: (props) => props.color,
      minWidth: 120,
    },
  },
  button: {
    margin: theme.spacing(1),
  }
}));
const SelectExercises = ({ short_id, getProgram, exercises: { exercises } }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState([

    { exercise: [] },
  ]
    // exerciseListTwo: [{ exerciseList: [] }],
    // exerciseListThree: [{ exerciseList: [] }],
    // exerciseListFour: [{ exerciseList: [] }],
  );


  useEffect(() => {
    getProgram(short_id);
  }, [getProgram]);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (index, event) => {
    // const name = event.target.id.split('-')[0];
    const values = [...formData];
    values[index][event.target.name] = event.target.value;
    // values[index][`${name}`] = values.concat(event.target.innerText);
    // console.log(options);
    // console.log(event.target.id.split("-")[0]);
    setFormData(values);
  };

  // console.log(formData);
  const handleAddFields = () => {
    setFormData([...formData, { exercise: '' }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...formData];
    values.splice(index, 1);
    setFormData(values);
  };

  // const handleChangeMultiple = (event) => {
  //   const { options } = event.target;
  //   const value = [];
  //   for (let i = 0, l = options.length; i < l; i += 1) {
  //     if (options[i].selected) {
  //       value.push(options[i].value);
  //     }
  //   }
  //   setPersonName(value);
  // };

  return (
    <Container>
      <h1 style={ { color: '#fff', fontWeight: 300 } }>Add exercises</h1>
      <form className={ classes.root } onSubmit={ (e) => onSubmit(e) }>
        {
          formData.map((data, idx) => (
            <div key={ idx }>
              {/* <Autocomplete
                onChange={ (e) => onChange(idx, e) }
                multiple
                id="exercise"
                options={ exercises }
                value={ exercises.exercise }
                getOptionLabel={ (option) => option.exercise }
                style={ { width: 300 } }
                renderInput={ (params) => <TextField { ...params } label="Exercise List" variant="outlined" /> }
              /> */}
              <InputLabel>Exercises</InputLabel>
              <Select
                multiple
                value={ data.exercise }
                // onChange={ handleChangeMultiple }
                input={ <Input /> }
              >
                {
                  exercises.map((item) => (
                    <MenuItem key={ item.exercise._id } value={ item.exercise }>
                      { item.exercise }
                    </MenuItem>
                  ))
                }
              </Select>
              {/* <TextField
                name="exercise"
                label="Exercise"
                variant="filled"
                value={ data.exercise }
                onChange={ (e) => onChange(idx, e) }
              /> */}
              < IconButton
                color="primary"
                onClick={ () => handleRemoveFields(idx) }
              >
                <RemoveIcon />
              </ IconButton>
              <IconButton
                color="primary"
                onClick={ () => handleAddFields() }
              >
                <AddIcon />
              </IconButton>
            </div>))

        }
        <Button
          className={ classes.button }
          variant="contained"
          color="primary"
          type="submit"
        // onClick={ handleSubmit }
        >Send</Button>
      </form>
    </Container >
  );

};
SelectExercises.propTypes = {
  exercises: PropTypes.object.isRequired,
  getProgram: PropTypes.func.isRequired,
  addExercisesAndDays: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  exercises: state.exercises
});

export default connect(mapStateToProps, { getProgram, addExercisesAndDays })(SelectExercises);
