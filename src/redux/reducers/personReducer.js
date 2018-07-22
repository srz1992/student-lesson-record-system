import { combineReducers } from 'redux';
import { PERSON_ACTIONS } from '../actions/personActions';

const studentProfile = (state = {studentCalled: false, failure: false}, action) => {
  switch (action.type) {
    case PERSON_ACTIONS.FETCH_STUDENT_FALIURE:
      return {...state, failure: true} || state;
    case PERSON_ACTIONS.STUDENT_RESET:
      return {...state, failure: false}
    
    case PERSON_ACTIONS.STUDENT_CALLED_RESET:
      return {...state, studentCalled: false}
      case PERSON_ACTIONS.SET_STUDENT:
      console.log('action.student:', action.student);
      console.log('date:', action.student.date_of_birth);
      return {...action.student, studentCalled: true} || state;
    
    case PERSON_ACTIONS.UPDATE_STUDENT_CALLED:
      console.log(state);
      
      return {...state, studentCalled: true}
    
    case PERSON_ACTIONS.UPDATE_STUDENT_COMPLETE:
      return {...state, studentCalled: true}
    default:
      return {...state};
  }
};

const teacherProfile = (state = {teacherCalled: false, failure: false}, action) => {
  switch (action.type) {
    case PERSON_ACTIONS.FETCH_TEACHER_FAILURE:
      return {...state, failure: true}
    case PERSON_ACTIONS.TEACHER_RESET:
      return {...state, failure: false}
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
