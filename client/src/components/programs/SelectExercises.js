import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProgram, addExercisesAndDays } from '../../actions/programs';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      backgroundColor: 'white',
      color: (props) => props.color,
      minWidth: 400,
    },
  },
  button: {
    margin: theme.spacing(1),
  }
}));
const SelectExercises = ({ short_id, getProgram }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState([{ exerciseListOne: [] }]);
  const [formDataTwo, setFormDataTwo] = useState([{ exerciseListTwo: [] }]);
  const [formDataThree, setFormDataThree] = useState([{ exerciseListThree: [] }]);
  const [formDataFour, setFormDataFour] = useState([{ exerciseListFour: [] }]);
  const [id, setId] = useState({ id: short_id });



  // useEffect(() => {
  //   getProgram(id.id);
  // }, [getProgram, id.id]);

  const onSubmit = (e) => {
    e.preventDefault();
    addExercisesAndDays(formData, id.id);
    console.log(formData[0].exerciseListOne);
    // console.log('inside submit', short_id);
    // addExercisesAndDays(formDataTwo);
    // addExercisesAndDays(formDataThree);
    // addExercisesAndDays(formDataFour);
  };

  const onChange = (index, event) => {
    const values = [...formData];
    values[index][event.target.name] = event.target.value.split(',');
    // console.log(formData);
    setFormData(values);
  };


  const handleAddFields = () => {
    setFormData([...formData, { exerciseListOne: '' }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...formData];
    if (index > 0) {
      values.splice(index, 1);
    }
    setFormData(values);
  };
  const onChangeTwo = (index, event) => {
    const valuesTwo = [...formDataTwo];
    valuesTwo[index][event.target.name] = event.target.value.split(',');
    setFormDataTwo(valuesTwo);
  };


  const handleAddFieldsTwo = () => {
    setFormDataTwo([...formDataTwo, { exerciseListTwo: '' }]);
  };

  const handleRemoveFieldsTwo = (index) => {
    const valuesTwo = [...formDataTwo];
    if (index > 0) {
      valuesTwo.splice(index, 1);
    }
    setFormDataTwo(valuesTwo);
  };
  const onChangeThree = (index, event) => {
    const valuesThree = [...formDataThree];
    valuesThree[index][event.target.name] = event.target.value.split(',');
    setFormDataThree(valuesThree);
  };


  const handleAddFieldsThree = () => {
    setFormDataThree([...formDataThree, { exerciseListThree: '' }]);
  };

  const handleRemoveFieldsThree = (index) => {
    const valuesThree = [...formDataThree];
    if (index > 0) {
      valuesThree.splice(index, 1);
    }
    setFormDataThree(valuesThree);
  };
  const onChangeFour = (index, event) => {
    const valuesFour = [...formDataFour];
    valuesFour[index][event.target.name] = event.target.value.split(',');
    setFormDataFour(valuesFour);
  };


  const handleAddFieldsFour = () => {
    setFormDataFour([...formDataFour, { exerciseListFour: '' }]);
  };

  const handleRemoveFieldsFour = (index) => {
    const valuesFour = [...formDataFour];
    if (index > 0) {
      valuesFour.splice(index, 1);
    }
    setFormDataFour(valuesFour);
  };

  // console.log([formData].concat([formDataTwo]).concat([formDataThree]).concat([formDataFour]));
  return (
    <Container>
      <form className={ classes.root } onSubmit={ (e) => onSubmit(e) }>
        <Button
          className={ classes.button }
          variant="contained"
          color="primary"
          type="submit"
        // onClick={ handleSubmit }
        >Send</Button>
        <div style={ { marginLeft: -400, position: 'relative' } }>
          <h1 style={ { color: '#fff', fontWeight: 300 } }>Week One</h1>
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
                renderInput={ (params) => <TextField { ...params } label="Exercise List" variant="filled" /> }
              /> */}
                <TextField
                  // select
                  name="exerciseListOne"
                  label="Week One"
                  variant="filled"
                  value={ data.exerciseListOne }
                  onChange={ (e) => onChange(idx, e) }
                />
                {/* {
                  exercises.map((option) => (
                    <option key={ option._id } value={ option.exercise }>{ option.exercise }</option>
                  ))
                } */}
                {/* </TextField> */ }
                < IconButton
                  color="primary"
                  onClick={ () => handleRemoveFields(idx) }
                >
                  <RemoveIcon />
                </ IconButton>
                <IconButton
                  color="primary"
                  onClick={ () => handleAddFields(idx) }
                >
                  <AddIcon />
                </IconButton>
              </div>))
          }
        </div>
        <div style={ { marginLeft: 130, marginTop: -100, position: 'fixed' } }>
          <h1 style={ { color: '#fff', fontWeight: 300 } }>Week Two</h1>
          {
            formDataTwo.map((data, idx) => (
              <div key={ idx }>
                <TextField
                  name="exerciseListTwo"
                  label="Week Two"
                  variant="filled"
                  value={ data.exerciseListTwo }
                  onChange={ (e) => onChangeTwo(idx, e) }
                />
                < IconButton
                  color="primary"
                  onClick={ () => handleRemoveFieldsTwo(idx) }
                >
                  <RemoveIcon />
                </ IconButton>
                <IconButton
                  color="primary"
                  onClick={ () => handleAddFieldsTwo(idx) }
                >
                  <AddIcon />
                </IconButton>
              </div>))
          }
        </div>
        <div style={ { marginLeft: 650, marginTop: -100, position: 'fixed' } }>
          <h1 style={ { color: '#fff', fontWeight: 300 } }>Week Three</h1>
          {
            formDataThree.map((data, idx) => (
              <div key={ idx }>
                <TextField
                  name="exerciseListThree"
                  label="Week Three"
                  variant="filled"
                  value={ data.exerciseListThree }
                  onChange={ (e) => onChangeThree(idx, e) }
                />
                < IconButton
                  color="primary"
                  onClick={ () => handleRemoveFieldsThree(idx) }
                >
                  <RemoveIcon />
                </ IconButton>
                <IconButton
                  color="primary"
                  onClick={ () => handleAddFieldsThree(idx) }
                >
                  <AddIcon />
                </IconButton>
              </div>))
          }
        </div>
        <div style={ { marginLeft: 1150, marginTop: -100, position: 'fixed' } }>
          <h1 style={ { color: '#fff', fontWeight: 300 } }>Week Four</h1>
          {
            formDataFour.map((data, idx) => (
              <div key={ idx }>
                <TextField
                  name="exerciseListFour"
                  label="Week Four"
                  variant="filled"
                  value={ data.exerciseListFour }
                  onChange={ (e) => onChangeFour(idx, e) }
                />
                < IconButton
                  color="primary"
                  onClick={ () => handleRemoveFieldsFour(idx) }
                >
                  <RemoveIcon />
                </ IconButton>
                <IconButton
                  color="primary"
                  onClick={ () => handleAddFieldsFour(idx) }
                >
                  <AddIcon />
                </IconButton>
              </div>))
          }
        </div>

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
