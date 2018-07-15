import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import person from './personReducer';
import booking from './bookingReducer';
import lessons from './lessonReducer';

const store = combineReducers({
  user,
  login,
  person,
  booking,
  lessons
});

export default store;
