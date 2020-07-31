import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_CLIENT_PROFILE,
  CLIENT_PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_ALL_PROFILES,
  PROFILES_ERROR,
  UPDATE_RM,
  EDIT_CLIENT_PROFILE,
  DELETE_CLIENT,
  GET_CLIENT_ESTIMATES,
  GET_CLIENT_PROGRAMS,
  GET_CLIENT_NOTES,
  UPDATE_WEIGHT,
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

// Insert client profile 
export const insertClient = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.put('/clients/insert', formData, config);
    dispatch({
      type: GET_CLIENT_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Client added successfully', 'success'));
    history.push('/dashboard/clients');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: CLIENT_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


// Edit client profile
export const editClient = (formData, client_id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post(`/clients/edit/${client_id}`, formData, config);
    dispatch({
      type: EDIT_CLIENT_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Client updated successfully', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: CLIENT_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add new RM
export const addRM = (formData, client_id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post(`/clients/add/${client_id}`, formData, config);
    dispatch({
      type: UPDATE_RM,
      payload: res.data,
    });
    dispatch(setAlert('New RM added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: CLIENT_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Add new weight
export const addWeight = (formData, client_id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post(`/clients/add-weight/${client_id}`, formData, config);
    dispatch({
      type: UPDATE_WEIGHT,
      payload: res.data,
    });
    dispatch(setAlert('New weight added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: CLIENT_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete client
export const deleteClient = (client_id) => async (dispatch) => {
  // if (window.confirm('Are you sure? This will be permanent.'))
  try {
    await axios.delete(`/clients/delete/${client_id}`);
    dispatch({
      type: DELETE_CLIENT,
    });
  } catch (err) {
    dispatch({
      type: CLIENT_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get estimates
export const getEstimates = (formData, client_id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post(`/clients/calculate/${client_id}`, formData, config);
    dispatch({
      type: GET_CLIENT_ESTIMATES,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
    dispatch({
      type: CLIENT_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Get programs
export const getClientPrograms = (client_id) => async (dispatch) => {
  try {

    const res = await axios.get(`/clients/get-programs/${client_id}`);
    dispatch({
      type: GET_CLIENT_PROGRAMS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
    dispatch({
      type: CLIENT_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit/Insert client notes
export const addNotes = (formData, client_id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post(`/clients/notes/${client_id}`, formData, config);
    dispatch({
      type: GET_CLIENT_NOTES,
      payload: res.data,
    });
  } catch (err) {

    dispatch({
      type: CLIENT_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
