import {
  GET_EXERCISE_LIBRARY,
  GET_SINGLE_EXERCISE,
  EDIT_SINGLE_EXERCISE,
  DELETE_SINGLE_EXERCISE,
  GET_EXERCISE_LIBRARY_ERROR,
  GET_EXERCISE_LIBRARY_CLEAR,
} from '../actions/types';

const initialState = {
  singleExerciseName: null,
  exerciseLibraryList: [],
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_SINGLE_EXERCISE:
      return {
        ...state,
        singleExerciseName: payload,
        loading: false,
      };
    case EDIT_SINGLE_EXERCISE:
      return {
        ...state,
        loading: false,
        singleExerciseName: state.exerciseLibraryList.map((ex) => ex._id === payload)
      };
    case GET_EXERCISE_LIBRARY:
      return {
        ...state,
        exerciseLibraryList: payload,
        loading: false
      };
    case GET_EXERCISE_LIBRARY_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case GET_EXERCISE_LIBRARY_CLEAR:
      return {
        ...state,
        singleExerciseName: null,
        exerciseLibraryList: [],
        loading: false,
      };
    case DELETE_SINGLE_EXERCISE:
      return {
        ...state,
        singleExerciseName: null,
        exerciseLibraryList: state.exerciseLibraryList.filter((ex) => ex._id !== payload),
        loading: false,
      };
    default:
      return state;
  }
}