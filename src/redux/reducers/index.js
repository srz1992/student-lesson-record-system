import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import person from './personReducer';
import booking from './bookingReducer'

const store = combineReducers({
  user,
  login,
  person,
  booking
});

export default store;
