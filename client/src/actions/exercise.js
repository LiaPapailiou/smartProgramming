import axios from 'axios';
import {
  GET_EXERCISES,
  GET_EXERCISE,
  GET_EXERCISES_ERROR,
  GET_EXERCISES_CLEAR,
} from './types';


export const getExercises = () => async (dispatch) => {
  //dispatch({ type: GET_EXERCISES_CLEAR });

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

