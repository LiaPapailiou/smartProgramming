import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PROGRAMS,
  GET_PROGRAM,
  DELETE_PROGRAM,
  PROGRAM_ERROR,
} from './types';


// Get all
export const getPrograms = () => async (dispatch) => {
  try {
    const res = await axios.get('/programs');
    dispatch({
      type: GET_PROGRAMS,
      payloadd: res.data,
    });

  } catch (err) {
    dispatch({
      type: PROGRAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};;

// Get by ID
export const getPrograms = (program_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/programs/search/${program_id}`);
    dispatch({
      type: GET_PROGRAM,
      payloadd: res.data,
    });

  } catch (err) {
    dispatch({
      type: PROGRAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Insert
export const insertProgram = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.put('/programs/insert', formData, config);
    dispatch({
      type: GET_PROGRAM,
      payload: res.data,
    });
    dispatch(setAlert('Program added successfully', 'success'));

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROGRAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Delete
export const deleteProgram = (program_id) => async (dispatch) => {
  try {
    await axios.delete(`/programs/delete/${program_id}`);
    dispatch({
      type: DELETE_PROGRAM,
      payload: id
    });
    dispatch(setAlert('Program removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROGRAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};