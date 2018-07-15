import { combineReducers } from 'redux';
import { BOOKING_ACTIONS } from '../actions/bookingActions';

const booking = (state = {student_id: '', bookingList:[]}, action) => {
  switch (action.type) {
    case BOOKING_ACTIONS.SET_BOOKING:
      return {...state} || state;
    case BOOKING_ACTIONS.SET_STUDENT_ID:
        console.log('here is the state of booking:');
        return {...state, student_id: action.student}
    case BOOKING_ACTIONS.SET_BOOKINGS_REQUEST_LIST:
        console.log('setting booking list');
        return {...state, bookingList: action.bookings}
    
    default:
      return state;
  }
};

const teacherList = (state = [], action) => {
    switch (action.type){
        case BOOKING_ACTIONS.SET_TEACHER_LIST:
            return [...action.teacherList]
    default:
        return state;
    }
}

export default combineReducers({
  booking,
  teacherList
});
