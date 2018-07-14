import { put, takeLatest } from 'redux-saga/effects';
import { BOOKING_ACTIONS } from '../actions/bookingActions';
import { callTeachers, callStudent, sendBooking, callTeacherId } from '../requests/bookingRequests';

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

function* personSaga() {
  yield takeLatest(BOOKING_ACTIONS.FETCH_TEACHER_LIST, fetchTeachers);
  yield takeLatest(BOOKING_ACTIONS.FETCH_STUDENT_ID, fetchStudent)
  yield takeLatest(BOOKING_ACTIONS.POST_BOOKING, postBooking)
  yield takeLatest(BOOKING_ACTIONS.FETCH_TEACHER_ID, fetchTeacherId)
}


export default personSaga;
