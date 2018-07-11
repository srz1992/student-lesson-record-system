import { combineReducers } from 'redux';
import { PERSON_ACTIONS } from '../actions/personActions';

const studentProfile = (state = null, action) => {
  switch (action.type) {
    case PERSON_ACTIONS.SET_STUDENT:
      console.log('action.student:', action.student);
      return action.student || state;
    default:
      return state;
  }
};

const teacherProfile = (state = null, action) => {
  switch (action.type) {
    case PERSON_ACTIONS.SET_TEACHER:
      console.log('action.student:', action.teacher);
      return action.teacher || state;
    default:
      return state;
  }
};

export default combineReducers({
  studentProfile,
  teacherProfile
});
