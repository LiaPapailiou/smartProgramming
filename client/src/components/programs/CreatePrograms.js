import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfiles, } from '../../actions/profile';
import { getExercises, } from '../../actions/exercise';
import { insertProgram, getPrograms } from '../../actions/programs';
import CustomeAlert from '../layout/CustomAlert';
import ProgramsTable from './ProgramsTable';
import shortid from "shortid";


const days = [1, 2, 3, 4, 5, 6, 7];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const years = [];
for (let i = 2020;i < 2051;i += 1) {
  years.push(i);
}

const CreatePrograms = ({ getAllProfiles, insertProgram, getExercises, getPrograms, profile: { clientProfiles }, exercises: { exercises } }) => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    client: '',
    month: '',
    year: '',
    daysPerWeek: 0,
  });
  const [programs, setPrograms] = useState([
    {
      percentages: '',
      repsMin: '',
      repsMax: '',
      sets: '',
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
      repsMin: '',
      repsMax: '',
      sets: '',
      exerciseList: [
        {
          0: [],
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
        },
      ],
    },
    {
      percentages: '',
      repsMin: '',
      repsMax: '',
      sets: '',
      exerciseList: [
        {
          0: [],
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
        },
      ],
    },
    {
      percentages: '',
      repsMin: '',
      repsMax: '',
      sets: '',
      exerciseList: [
        {
          0: [],
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
        },
      ],
    },
  ],
  );


  const {
    client,
    month,
    year,
    daysPerWeek,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onChangePrograms = (idx, e) => {
    const values = [...programs];
    values[idx][e.target.name] = e.target.value;
    setPrograms(values);
    setFormData({ ...formData, programs });
  };

  useEffect(() => {
    getAllProfiles();
    getExercises();
    getPrograms();
  }, [getAllProfiles, getExercises, getPrograms]);

  const onSubmit = (e) => {
    e.preventDefault();
    insertProgram(formData);
    setFormData({
      client: '',
      month: '',
      year: '',
      daysPerWeek: 0,
    });
    setPrograms([
      {
        percentages: '',
        repsMin: '',
        repsMax: '',
        sets: '',
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
        repsMin: '',
        repsMax: '',
        sets: '',
        exerciseList: [
          {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
          },
        ],
      },
      {
        percentages: '',
        repsMin: '',
        repsMax: '',
        sets: '',
        exerciseList: [
          {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
          },
        ],
      },
      {
        percentages: '',
        repsMin: '',
        repsMax: '',
        sets: '',
        exerciseList: [
          {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
          },
        ],
      },
    ]);
    setVisible(!visible);
  };

  return (
    <>
      <div className="alerts" style={ { position: 'absolute', marginLeft: 850 } }>
        <CustomeAlert />
      </div>
      <form className="program-form" onSubmit={ (e) => onSubmit(e) }>
        <label style={ { paddingLeft: '20px' } }>
          <select name="client" onChange={ (e) => onChange(e) } value={ client } style={ { color: '#000', fontSize: 14, marginTop: 5, padding: '0.15em', borderRadius: '0.3em', marginRight: 20 } } required>
            <option value="">Client</option>
            {
              clientProfiles.map((profile) =>
                <option value={ `${profile._id}` } key={ shortid.generate() }>{ profile.clientFirstName } { profile.clientLastName }</option>
              )
            }
          </select>
          <select name="month" onChange={ (e) => onChange(e) } value={ month } style={ { color: '#000', fontSize: 14, marginTop: 5, padding: '0.15em', borderRadius: '0.3em', marginRight: 20 } } required>
            <option value="">Month</option>
            {
              months.map((month) =>
                <option value={ `${month}` } key={ shortid.generate() }> { month }</option>
              )
            }
          </select>
          <select name="year" onChange={ (e) => onChange(e) } value={ year } style={ { color: '#000', fontSize: 14, marginTop: 5, padding: '0.15em', borderRadius: '0.3em', marginRight: 20 } } required>
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
          } } value={ daysPerWeek } style={ { color: '#000', fontSize: 14, marginTop: 5, padding: '0.15em', borderRadius: '0.3em', marginRight: 20 } } required>
            <option value="">Days</option>
            {
              days.map((day) =>
                <option value={ `${day}` } key={ shortid.generate() }> { day }</option>
              )
            }
          </select>
        </label>
        <table style={ {
          display: 'flex', flexDirection: 'column', maxWidth: '25vw', justifyContent: 'space-around', alignContent: 'stretch', alignItems: 'stretch',

        } }>
          <thead>
            <tr>
              <th style={ { color: '#93aabd', padding: '0.7em', fontSize: 20, fontWeight: 300, paddingBottom: 0, paddingTop: 0 } }>Percent</th>
              <th style={ { color: '#93aabd', padding: '1em', fontSize: 20, fontWeight: 300, paddingBottom: 0, paddingTop: 0 } }>Min</th>
              <th style={ { color: '#93aabd', padding: '1.3em', fontSize: 20, fontWeight: 300, paddingBottom: 0, paddingTop: 0 } }>Max</th>
              <th style={ { color: '#93aabd', padding: '1em', fontSize: 20, fontWeight: 300, paddingBottom: 0, paddingTop: 0 } }>Sets</th>
            </tr>
          </thead>
          { programs && programs.map((data, idx) => (
            <tbody key={ idx } style={ { display: 'flex', flexDirection: 'column', maxWidth: '21.7vw', justifyContent: 'space-around', alignContent: 'stretch', alignItems: 'stretch' } }>
              <tr>
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
                <td style={ { paddingRight: '2.5em' } }>
                  <input
                    type="text"
                    className="form-input"
                    style={ { width: '50px' } }
                    name="repsMin"
                    value={ data.repsMin }
                    onChange={ (e) => onChangePrograms(idx, e) }
                    required />
                </td>
                <td style={ { paddingRight: '2.8em' } }>
                  <input
                    type="text"
                    className="form-input"
                    style={ { width: '50px' } }
                    name="repsMax"
                    value={ data.repsMax }
                    onChange={ (e) => onChangePrograms(idx, e) }
                    required />
                </td>
                <td >
                  <input
                    type="text"
                    className="form-input"
                    style={ { width: '50px' } }
                    name="sets"
                    value={ data.sets }
                    onChange={ (e) => onChangePrograms(idx, e) }
                    required />
                </td>
              </tr>
            </tbody>
          )) }
        </table>
        <button
          style={ { marginLeft: 440, marginTop: -140, width: 20, backgroundColor: 'transparent', border: 0 } }
          type="submit"
          className="button-add"
          value="Next"><i className="fas fa-angle-double-right" style={ { width: 20, fontSize: 20, paddingRight: '0.25em' } }></i> </button>
      </form>
      <div className="inner-table">
        { visible && programs && programs.map((data, index) => (
          <ProgramsTable key={ shortid.generate() } days={ formData.daysPerWeek } exercises={ exercises } index={ index } programs={ programs } setPrograms={ setPrograms } />
        ))
        }
      </div>
    </>
  );
};

CreatePrograms.propTypes = {
  getExercises: PropTypes.func.isRequired,
  getAllProfiles: PropTypes.func.isRequired,
  insertProgram: PropTypes.func.isRequired,
  getPrograms: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  programs: PropTypes.object.isRequired,
  exercises: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  programs: state.programs,
  exercises: state.exercises,
});

export default connect(mapStateToProps, { getAllProfiles, getExercises, insertProgram, getPrograms })(CreatePrograms);

