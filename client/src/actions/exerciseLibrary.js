import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_EXERCISE_LIBRARY,
  GET_SINGLE_EXERCISE,
  EDIT_SINGLE_EXERCISE,
  DELETE_SINGLE_EXERCISE,
  GET_EXERCISE_LIBRARY_ERROR,
} from './types';

// Get all exercises in the library
export const getExerciseLibrary = () => async (dispatch) => {
  try {

    const res = await axios.get(`/exercise-log`);
    dispatch({
      type: GET_EXERCISE_LIBRARY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_EXERCISE_LIBRARY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get exercise in the library by ID
export const getSingleExercise = (ex_id) => async (dispatch) => {
  try {

    const res = await axios.get(`/exercise-log/search/${ex_id}`);
    dispatch({
      type: GET_SINGLE_EXERCISE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_EXERCISE_LIBRARY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Insert
export const insertSingleExercise = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.put('/exercise-log/insert', formData, config);
    dispatch({
      type: GET_SINGLE_EXERCISE,
      payload: res.data,
    });
    dispatch(setAlert('Exercise added successfully', 'success'));

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: GET_EXERCISE_LIBRARY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit exercise
export const editSingleExercise = (formData, ex_id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    await axios.post(`/exercise-log/edit/${ex_id}`, formData, config);
    dispatch({
      type: EDIT_SINGLE_EXERCISE,
      payload: ex_id,
    });
    dispatch(setAlert('Exercise updated successfully', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: GET_EXERCISE_LIBRARY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete exercise
export const deleteSingleExercise = (id) => async (dispatch) => {
  try {
    await axios.delete(`/exercise-log/delete/${id}`);
    dispatch({
      type: DELETE_SINGLE_EXERCISE,
      payload: id
    });
    dispatch(setAlert('Exercise removed', 'success'));
  } catch (err) {
    dispatch({
      type: GET_EXERCISE_LIBRARY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};