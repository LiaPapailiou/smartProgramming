import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_EXERCISES,
  GET_EXERCISE,
  GET_EXERCISES_ERROR,
  EDIT_EXERCISE,
  DELETE_EXERCISE,
  GET_EXERCISES_CLEAR,
} from './types';

// Get all exercises
export const getExercises = () => async (dispatch) => {
  dispatch({ type: GET_EXERCISES_CLEAR });

  try {

    const res = await axios.get(`/exercises`);
    dispatch({
      type: GET_EXERCISES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_EXERCISES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get exercise by ID
export const getExerciseById = (ex_id) => async (dispatch) => {
  try {

    const res = await axios.get(`/exercises/search/${ex_id}`);
    dispatch({
      type: GET_EXERCISE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_EXERCISES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Insert
export const insertExercise = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.put('/exercises/insert', formData, config);
    dispatch({
      type: GET_EXERCISE,
      payload: res.data,
    });
    dispatch(setAlert('Exercise added successfully', 'success'));
    history.push('/exercises');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, 'danger')));
    }
    dispatch({
      type: GET_EXERCISES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit exercise
export const editExercise = (formData, ex_id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post(`/exercises/edit/${ex_id}`, formData, config);
    dispatch({
      type: EDIT_EXERCISE,
      payload: res.data,
    });
    dispatch(setAlert('Exercise updated successfully', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, 'danger')));
    }
    dispatch({
      type: GET_EXERCISES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete exercise
export const deleteExercise = (ex_id) => async (dispatch) => {
  if (window.confirm('Are you sure? This will be permanent.'))
    try {
      await axios.delete(`/exercises/delete/${ex_id}`);
      dispatch({
        type: DELETE_EXERCISE,
      });
    } catch (err) {
      dispatch({
        type: GET_EXERCISES_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
};