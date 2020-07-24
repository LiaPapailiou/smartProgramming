import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import exercises from './exercises';
import exerciseLibrary from './exerciseLibrary';

export default combineReducers({
  alert,
  auth,
  profile,
  exercises,
  exerciseLibrary,
});