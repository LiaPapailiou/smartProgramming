import axios from 'axios';
import {
  GET_EXERCISES,
  GET_EXERCISES_ERROR,
  GET_EXERCISES_CLEAR,
} from './types';


export const getExercises = () => async (dispatch) => {
  dispatch({ type: GET_EXERCISES_CLEAR });

  try {

    const res = await axios.get(`/clients`);
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