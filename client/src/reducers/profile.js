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
  GET_CLIENT_NOTES,
} from '../actions/types';
const initialState = {
  clientProfile: null,
  clientProfiles: [],
  exerciseList: [],
  notes: null,
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CLIENT_PROFILE:
    case EDIT_CLIENT_PROFILE:
    case UPDATE_RM:
      return {
        ...state,
        clientProfile: payload,
        loading: false,
      };
    case GET_CLIENT_ESTIMATES:
      return {
        ...state,
        exerciseList: payload,
        loading: false,
      };
    case GET_CLIENT_NOTES:
      return {
        ...state,
        notes: payload,
        loading: false,
      };
    case GET_ALL_PROFILES:
      return {
        ...state,
        clientProfiles: payload,
        loading: false,
      };
    case CLIENT_PROFILE_ERROR:
    case PROFILES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
    case DELETE_CLIENT:
      return {
        ...state,
        clientProfile: null,
        clientProfiles: [],
        exerciseList: [],
        notes: null,
        loading: false,
      };
    default:
      return state;
  }
}