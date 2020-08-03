import {
  GET_PROGRAMS,
  GET_PROGRAM,
  ADD_PROGRAM_EXERCISES,
  DELETE_PROGRAM,
  PROGRAM_ERROR,
} from '../actions/types';

const initialState = {
  program: null,
  programs: [],
  loading: true,
  error: {}
};


export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROGRAM:
    case ADD_PROGRAM_EXERCISES:
      return {
        ...state,
        program: payload,
        loading: false
      };
    case GET_PROGRAMS:
      return {
        ...state,
        programs: payload,
        loading: false
      };
    case DELETE_PROGRAM:
      return {
        ...state,
        program: null,
        programs: state.programs.filter((program) => program._id !== payload),
        loading: false
      };
    case PROGRAM_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;

  }
}