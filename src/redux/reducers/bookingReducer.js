import { combineReducers } from 'redux';
import { BOOKING_ACTIONS } from '../actions/bookingActions';

const booking = (state = {student_id: '', bookingList:[], success:false, failure: false}, action) => {
  switch (action.type) {
    case BOOKING_ACTIONS.BOOKING_SUCCESS:
      return {...state, success:true} || state;
    case BOOKING_ACTIONS.BOOKING_FAILURE:
        return {...state, failure:true} || state;
    case BOOKING_ACTIONS.BOOKING_RESET:
        return {...state, success: false, failure: false}
    case BOOKING_ACTIONS.SET_STUDENT_ID:
        console.log('here is the state of booking:');
        return {...state, student_id: action.student}
    case BOOKING_ACTIONS.SET_BOOKINGS_LIST:
        console.log('setting booking list');
        return {...state, bookingList: action.bookings}
    case BOOKING_ACTIONS.SET_STUDENT_BOOKINGS_LIST:
        console.log('set student bookings list');
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
