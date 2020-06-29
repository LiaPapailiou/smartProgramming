import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_CLIENT_PROFILE,
  CLIENT_PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_ALL_PROFILES,
  PROFILES_ERROR,
} from './types';

// Get single profile
export const getClientProfile = (client_id) => async (dispatch) => {

  try {

    const res = await axios.get(`/clients/search/${client_id}`);
    dispatch({
      type: GET_CLIENT_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLIENT_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all profiles
export const getAllProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {

    const res = await axios.get(`/clients`);
    dispatch({
      type: GET_ALL_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

