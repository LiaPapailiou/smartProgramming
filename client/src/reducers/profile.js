import {
  GET_CLIENT_PROFILE,
  CLIENT_PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_ALL_PROFILES,
  PROFILES_ERROR,
} from '../actions/types';
const initialState = {
  clientProfile: null,
  clientProfiles: [],
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CLIENT_PROFILE:
      return {
        ...state,
        clientProfile: payload,
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
        clientProfile: null,
        clientProfiles: [],
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        clientProfile: null,
        clientProfiles: [],
        loading: false,
      };
    default:
      return state;
  }
}