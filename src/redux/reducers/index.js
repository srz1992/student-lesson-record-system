import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import person from './personReducer';

const store = combineReducers({
  user,
  login,
  person
});

export default store;
