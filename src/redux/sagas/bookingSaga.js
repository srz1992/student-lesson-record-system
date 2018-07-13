import { put, takeLatest } from 'redux-saga/effects';
import { BOOKING_ACTIONS } from '../actions/bookingActions';
import { callTeachers } from '../requests/bookingRequests';

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

function* personSaga() {
  yield takeLatest(BOOKING_ACTIONS.FETCH_TEACHER_LIST, fetchTeachers);
}

export default personSaga;
