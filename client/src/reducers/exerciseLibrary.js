import {
  GET_EXERCISE_LIBRARY,
  GET_SINGLE_EXERCISE,
  GET_EXERCISE_LIBRARY_PAGINATED,
  EDIT_SINGLE_EXERCISE,
  DELETE_SINGLE_EXERCISE,
  GET_EXERCISE_LIBRARY_ERROR,
  GET_EXERCISE_LIBRARY_CLEAR,
} from '../actions/types';

const initialState = {
  singleExercise: null,
  exerciseLibraryList: [],
  numPages: null,
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_SINGLE_EXERCISE:
      return {
        ...state,
        singleExercise: payload,
        loading: false,
      };

    case EDIT_SINGLE_EXERCISE:
      return {
        ...state,
        loading: false,
        singleExercise: payload,
      };
    case GET_EXERCISE_LIBRARY:
      return {
        ...state,
        exerciseLibraryList: payload,
        loading: false
      };
    case GET_EXERCISE_LIBRARY_PAGINATED:
      return {
        ...state,
        exerciseLibraryList: payload.exerciseLibraryList,
        numPages: payload.numPages,
        loading: false,
      };
    case GET_EXERCISE_LIBRARY_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case GET_EXERCISE_LIBRARY_CLEAR:
    case DELETE_SINGLE_EXERCISE:
      return {
        ...state,
        singleExercise: null,
        exerciseLibraryList: state.exerciseLibraryList.filter((ex) => ex._id !== payload),
        loading: false,
      };
    default:
      return state;
  }
}