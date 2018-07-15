import { put, takeLatest } from 'redux-saga/effects';
import { BOOKING_ACTIONS } from '../actions/bookingActions';
import { callTeachers, callStudent, sendBooking, callTeacherId, callBookings, putAcceptBooking, putRejectBooking, callAcceptedBookings } from '../requests/bookingRequests';

// get the list of Teachers from database
function* fetchTeachers() {
  try {
    const teacherList = yield callTeachers();
    yield put({
      type: BOOKING_ACTIONS.SET_TEACHER_LIST,
      teacherList
    });
    
  } catch (error) {
    console.log('error in fetchStudent saga:', error);
  }
}

function* fetchStudent(action) {
    console.log('fetchStudent:', action);
    const id = action.payload;
    try{
        const student = yield callStudent(id);
        yield put({
            type: BOOKING_ACTIONS.SET_STUDENT_ID, student
        })
    }
    catch(error){
        console.log('error getting student profile id:', error);
    }
}

function* postBooking(action){
    console.log('postBooking:', action);
    const booking = action.payload;
    try{
        yield sendBooking(booking);
    }
    catch(error){
        console.log('error posting booking in postBooking saga:', error);
    }
}

function* fetchPendingBookings(action){
    console.log('fetchPendingBookings:', action);
    try{
        const bookings = yield callBookings(action.payload)
        yield put({type:BOOKING_ACTIONS.SET_BOOKINGS_LIST, bookings})
    }
    catch(error){
        console.log('error fetching bookings:', error);
        
    }
    
}

function* fetchAcceptedBookings(action){
    console.log('fetchAcceptedBookings:', action);
    try{
        const bookings = yield callAcceptedBookings(action.payload)
        yield put({type:BOOKING_ACTIONS.SET_BOOKINGS_LIST, bookings})
    }
    catch(error){
        console.log('error fetching bookings:', error);
    }
    
}

function* fetchTeacherId(action){
    console.log('fetchTeacherId:', action);
    const id = action.payload;
    try {
        const teacher = yield callTeacherId(id)
        yield put({type:BOOKING_ACTIONS.SET_TEACHER_ID, teacher})
    }
    catch(error){
        console.log('error fetching teacher ID');
        
    }
    
}

function* updateBookingAccept(action){
    console.log('updatingBookingAccept:', action);
    const booking_id = action.payload.booking_id;
    const teacher_id = action.payload.teacher_id;
    try{
       yield putAcceptBooking(booking_id);
       yield put({type:BOOKING_ACTIONS.FETCH_BOOKINGS_REQUEST_LIST, payload: teacher_id})
    }
    catch(error){
        console.log('error updating booking to accepted:', error);
    }
}

function* updateBookingReject(action){
    console.log('updatingBookingAccept:', action);
    const booking_id = action.payload.booking_id;
    const teacher_id = action.payload.teacher_id;
    try{
       yield putRejectBooking(booking_id);
       yield put({type:BOOKING_ACTIONS.FETCH_BOOKINGS_REQUEST_LIST, payload: teacher_id})
    }
    catch(error){
        console.log('error updating booking to accepted:', error);
        
    }
}

function* personSaga() {
  yield takeLatest(BOOKING_ACTIONS.FETCH_TEACHER_LIST, fetchTeachers);
  yield takeLatest(BOOKING_ACTIONS.FETCH_STUDENT_ID, fetchStudent);
  yield takeLatest(BOOKING_ACTIONS.POST_BOOKING, postBooking);
  yield takeLatest(BOOKING_ACTIONS.FETCH_TEACHER_ID, fetchTeacherId);
  yield takeLatest(BOOKING_ACTIONS.FETCH_BOOKINGS_REQUEST_LIST, fetchPendingBookings);
  yield takeLatest(BOOKING_ACTIONS.UPDATE_BOOKING_ACCEPT, updateBookingAccept);
  yield takeLatest(BOOKING_ACTIONS.UPDATE_BOOKING_REJECT, updateBookingReject);
  yield takeLatest(BOOKING_ACTIONS.FETCH_BOOKINGS_LIST, fetchAcceptedBookings);
}


export default personSaga;
