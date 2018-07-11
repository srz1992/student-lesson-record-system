import { put, takeLatest } from 'redux-saga/effects';
import { PERSON_ACTIONS } from '../actions/personActions';
import { callStudent } from '../requests/personRequests';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchStudent(action) {
  try {
    const student = yield callStudent(action.payload);
    yield put({
      type: PERSON_ACTIONS.SET_STUDENT,
      student,
    });
    
  } catch (error) {
    
    // yield put({
    //   type: USER_ACTIONS.USER_FETCH_FAILED,
    //   message: error.data || "FORBIDDEN",
    // });
  }
}

function* personSaga() {
  yield takeLatest(PERSON_ACTIONS.FETCH_STUDENT, fetchStudent);
}

export default personSaga;
