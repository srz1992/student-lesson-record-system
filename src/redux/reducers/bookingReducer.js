import { combineReducers } from 'redux';
import { BOOKING_ACTIONS } from '../actions/bookingActions';

const booking = (state = {teacherCalled: false}, action) => {
  switch (action.type) {
    case BOOKING_ACTIONS.SET_BOOKING:
      console.log('action.student:', action.teacher);
      return {...action.teacher, teacherCalled: true} || state;
    
    default:
      return state;
  }
};

const teacherList = (state = [], action) => {
    switch (action.type){
        case BOOKING_ACTIONS.SET_TEACHER_LIST:
            console.log('action.teacherList:', action.teacherList);
            return [...action.teacherList]
    default:
        return state;
    }
}

export default combineReducers({
  booking,
  teacherList
});
