import {
  GET_EXERCISES,
  GET_EXERCISE,
  GET_EXERCISES_ERROR,
  GET_EXERCISES_CLEAR,
  EDIT_EXERCISE,
  DELETE_EXERCISE,
} from '../actions/types';

const initialState = {
  exercise: null,
  exercises: [],
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_EXERCISE:
    case EDIT_EXERCISE:
      return {
        ...state,
        exercise: payload,
        exercises: [],
        loading: false,
      };
    case GET_EXERCISES:
      return {
        ...state,
        exercises: payload,
        loading: false
      };
    case GET_EXERCISES_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case GET_EXERCISES_CLEAR:
    case DELETE_EXERCISE:
      return {
        ...state,
        exercise: null,
        exercises: [],
        loading: false,
      };
    default:
      return state;
  }
}