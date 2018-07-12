import { combineReducers } from 'redux';
import { PERSON_ACTIONS } from '../actions/personActions';

const studentProfile = (state = {studentCalled: false}, action) => {
  switch (action.type) {
    case PERSON_ACTIONS.SET_STUDENT:
      console.log('action.student:', action.student);
      console.log('date:', action.student.date_of_birth);
      return {...action.student, studentCalled: true} || state;
    
    case PERSON_ACTIONS.UPDATE_STUDENT_CALLED:
      console.log(state);
      
      return {...state, studentCalled: false}
    
    case PERSON_ACTIONS.UPDATE_STUDENT_COMPLETE:
      console.log('updating studentCalled to false');
      return {...action.student, studentCalled: false}
      
    
      default:
      return state;
  }
};

const teacherProfile = (state = {teacherCalled: false}, action) => {
  switch (action.type) {
    case PERSON_ACTIONS.SET_TEACHER:
      console.log('action.student:', action.teacher);
      return {...action.teacher, teacherCalled: true} || state;
    default:
      return state;
  }
};

export default combineReducers({
  studentProfile,
  teacherProfile
});
