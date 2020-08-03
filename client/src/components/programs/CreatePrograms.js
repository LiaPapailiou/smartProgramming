import React, { useState, useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfiles, } from '../../actions/profile';
import { getExercises, } from '../../actions/exercise';
import { insertProgram } from '../../actions/programs';
import { useHistory } from 'react-router-dom';

// import Select from 'react-select';
// import AsyncSelect from 'react-select/async';
// import makeAnimated from 'react-select/animated';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import BootstrapTable from 'react-bootstrap-table-next';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const years = [];
for (let i = 2020;i < 2051;i += 1) {
  years.push(i);
}
const list = [];
for (let i = 0;i < 5;i += 1) {
  list.push(i);
}

const CreatePrograms = ({ getAllProfiles, insertProgram, getExercises, profile: { clientProfiles } }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    client: '',
    month: '',
    year: '',
    percentageOne: '',
    reps_minOne: '',
    reps_maxOne: '',
    setsOne: '',
    exerciseListOne: [],
    percentageTwo: '',
    reps_minTwo: '',
    reps_maxTwo: '',
    setsTwo: '',
    exerciseListTwo: [],
    percentageThree: '',
    reps_minThree: '',
    reps_maxThree: '',
    setsThree: '',
    exerciseListThree: [],
    percentageFour: '',
    reps_minFour: '',
    reps_maxFour: '',
    setsFour: '',
    exerciseListFour: [],
  });

  const {
    client,
    month,
    year,
    percentageOne,
    reps_minOne,
    reps_maxOne,
    setsOne,
    exerciseListOne,
    percentageTwo,
    reps_minTwo,
    reps_maxTwo,
    setsTwo,
    exerciseListTwo,
    percentageThree,
    reps_minThree,
    reps_maxThree,
    setsThree,
    exerciseListThree,
    percentageFour,
    reps_minFour,
    reps_maxFour,
    setsFour,
    exerciseListFour,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.name);
  };


  // const handleChangeOne = (e) => {
  //   e.map((item) => {
  //     setFormData({ ...formData, [`${item.name}`]: formData.exerciseListOne.concat(item.value) });
  //   });
  // };
  // const handleChangeTwo = (e) => {
  //   e.map((item) => {
  //     setFormData({ ...formData, [`${item.name}`]: formData.exerciseListOne.concat(item.value) });
  //   });
  // };

  useEffect(() => {
    getAllProfiles();
    getExercises();
  }, [getAllProfiles, getExercises]);

  const onSubmit = (e) => {
    e.preventDefault();
    insertProgram(formData);
    setFormData({
      client: '',
      month: '',
      year: '',
      percentageOne: '',
      reps_minOne: '',
      reps_maxOne: '',
      setsOne: '',
      exerciseListOne: [],
      percentageTwo: '',
      reps_minTwo: '',
      reps_maxTwo: '',
      setsTwo: '',
      exerciseListTwo: [],
      percentageThree: '',
      reps_minThree: '',
      reps_maxThree: '',
      setsThree: '',
      exerciseListThree: [],
      percentageFour: '',
      reps_minFour: '',
      reps_maxFour: '',
      setsFour: '',
      exerciseListFour: [],
    });
    history.push('/dashboard/clients');
  };
  console.log(formData);
  // const optionsOne = exercises.map((exercise) => ({
  //   name: "exerciseListOne",
  //   label: exercise.exercise,
  //   value: exercise._id,
  // }));
  // const optionsTwo = exercises.map((exercise) => ({
  //   name: "exerciseListTwo",
  //   label: exercise.exercise,
  //   value: exercise._id,
  // }));
  return (
    <section className="program">
      <form className="program-form" onSubmit={ (e) => onSubmit(e) }>
        <label>
          <select name="client" onChange={ (e) => onChange(e) } value={ client } style={ { color: '#000', fontSize: 14, marginTop: 5, padding: '0.15em', borderRadius: '0.3em', marginRight: 20 } }>
            <option value="">Client</option>
            {
              clientProfiles.map((profile) =>
                <option value={ `${profile._id}` }>{ profile.clientFirstName } { profile.clientLastName }</option>
              )
            }
          </select>
          <select name="month" onChange={ (e) => onChange(e) } value={ month } style={ { color: '#000', fontSize: 14, marginTop: 5, padding: '0.15em', borderRadius: '0.3em', marginRight: 20 } }>
            <option value="">Month</option>
            {
              months.map((month) =>
                <option option value={ `${month}` } > { month }</option>
              )
            }
          </select>
          <select name="year" onChange={ (e) => onChange(e) } value={ year } style={ { color: '#000', fontSize: 14, marginTop: 5, padding: '0.15em', borderRadius: '0.3em', marginRight: 20 } }>
            <option value="">Year</option>
            {
              years.map((year) =>
                <option option value={ `${year}` } > { year }</option>
              )
            }
          </select>
        </label>
        <table>
          <thead>
            <tr>
              <th>
                <th style={ { color: '#93aabd', padding: '1em', fontSize: 18, fontWeight: 300 } }>Week</th>
                <th style={ { color: '#93aabd', padding: '1em', fontSize: 18, fontWeight: 300 } }>Percentages</th>
                <th style={ { color: '#93aabd', padding: '1em', fontSize: 18, fontWeight: 30 } }>Min</th>
                <th style={ { color: '#93aabd', padding: '1em', fontSize: 18, fontWeight: 30 } }>Max</th>
                <th style={ { color: '#93aabd', padding: '1em', fontSize: 18, fontWeight: 30 } }>Sets</th>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={ { color: '#fff', fontSize: 18 } }> One </td>
              <td>
                <input
                  type="text"
                  className="form-input"
                  style={ { width: '50px' } }
                  name="percentageOne"
                  value={ percentageOne }
                  onChange={ (e) => onChange(e) }
                  placeholder="%"
                  required />
              </td>
              <td>
                <input
                  type="text"
                  className="form-input"
                  style={ { width: '50px' } }
                  name="percentageOne"
                  value={ percentageOne }
                  onChange={ (e) => onChange(e) }
                  required />
              </td>
              <td>
                <input
                  type="text"
                  className="form-input"
                  style={ { width: '30px' } }
                  name="reps_maxOne"
                  value={ reps_maxOne }
                  onChange={ (e) => onChange(e) }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-input"
                  style={ { width: '30px' } }
                  name="reps_minOne"
                  value={ reps_minOne }
                  onChange={ (e) => onChange(e) }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-input"
                  style={ { width: '30px' } }
                  name="setsOne"
                  value={ setsOne }
                  onChange={ (e) => onChange(e) }
                />
              </td>
              <td style={ { color: '#fff', fontSize: 18 } }> Two </td>
              <td>
                <input
                  type="text"
                  className="form-input"
                  style={ { width: '30px' } }
                  name="percentageTwo"
                  value={ percentageTwo }
                  onChange={ (e) => onChange(e) }
                  required />
              </td>
              <td>
                <input
                  type="text"
                  className="form-input"
                  style={ { width: '30px' } }
                  name="reps_minTwo"
                  value={ reps_minTwo }
                  onChange={ (e) => onChange(e) }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-input"
                  style={ { width: '30px', } }
                  name="reps_maxTwo"
                  value={ reps_maxTwo }
                  onChange={ (e) => onChange(e) }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-input"
                  style={ { width: '30px' } }
                  name="setsTwo"
                  value={ setsTwo }
                  onChange={ (e) => onChange(e) }
                />
              </td>
              <td style={ { color: '#fff', fontSize: 18 } }> Three </td>
              <td>
                <input
                  type="text"
                  className="form-input"
                  style={ { width: '30px' } }
                  name="percentageThree"
                  value={ percentageThree }
                  onChange={ (e) => onChange(e) }
                  required />
              </td>
              <td>
                <input
                  type="text"
                  className="form-input"
                  style={ { width: '30px' } }
                  name="reps_minThree"
                  value={ reps_minThree }
                  onChange={ (e) => onChange(e) }
                />
              </td>
              <td>

                <input
                  type="text"
                  className="form-input"
                  style={ { width: '30px' } }
                  name="reps_maxThree"
                  value={ reps_maxThree }
                  onChange={ (e) => onChange(e) }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-input"
                  style={ { width: '30px' } }
                  name="setsThree"
                  value={ setsThree }
                  onChange={ (e) => onChange(e) }
                />

              </td>
              <td style={ { color: '#fff', fontSize: 18 } }> Four </td>
              <td>

                <input
                  type="text"
                  className="form-input"
                  style={ { width: '30px' } }
                  name="percentageFour"
                  value={ percentageFour }
                  onChange={ (e) => onChange(e) }
                  required />

              </td>
              <td>
                <input
                  type="text"
                  className="form-input"
                  style={ { width: '30px' } }
                  name="reps_minFour"
                  value={ reps_minFour }
                  onChange={ (e) => onChange(e) }
                />

              </td>
              <td>
                <input
                  type="text"
                  className="form-input"
                  style={ { width: '30px' } }
                  name="reps_maxFour"
                  value={ reps_maxFour }
                  onChange={ (e) => onChange(e) }
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-input"
                  style={ { width: '30px', marginRight: '2em' } }
                  name="setsFour"
                  value={ setsFour }
                  onChange={ (e) => onChange(e) }
                />
              </td>
            </tr>
          </tbody>
        </table>
        {/* <Select
            isClearable={ false }
            isMulti
            options={ optionsOne }
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={ (e) => handleChangeOne(e) }
          /> */}

        {/* <Select
            isClearable
            isMulti
            options={ optionsTwo }
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={ (e) => handleChangeTwo(e) }
          /> */}
        <input
          type="submit"
          className="input-add"
          value="Next" />
      </form>
    </section>
  );
};

CreatePrograms.propTypes = {
  getExercises: PropTypes.func.isRequired,
  getAllProfiles: PropTypes.func.isRequired,
  insertProgram: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  // exercises: PropTypes.object.isRequired,
  // programs: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  // exercises: state.exercises
  // programs: state.programs
});
export default connect(mapStateToProps, { getAllProfiles, getExercises, insertProgram })(CreatePrograms);
