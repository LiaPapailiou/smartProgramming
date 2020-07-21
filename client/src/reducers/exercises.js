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
      return {
        ...state,
        exercise: payload,
        exercises: [],
        loading: false,
      };
    case EDIT_EXERCISE:
      return {
        ...state,
        loading: false,
        exercise: state.exercises.map((ex) => ex._id === payload)
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
        exercises: state.exercises.filter((ex) => ex._id !== payload),
        loading: false,
      };
    default:
      return state;
  }
}