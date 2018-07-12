import { put, takeLatest } from 'redux-saga/effects';
import { PERSON_ACTIONS } from '../actions/personActions';
import { callStudent, putStudent } from '../requests/personRequests';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchStudent(action) {
  try {
    const student = yield callStudent(action.payload);
    yield put({
      type: PERSON_ACTIONS.SET_STUDENT,
      student,
    });
    
  } catch (error) {
    console.log('error in fetchStudent saga:', error);
    
    // yield put({
    //   type: USER_ACTIONS.USER_FETCH_FAILED,
    //   message: error.data || "FORBIDDEN",
    // });
  }
}

function* updateStudent(action) {
  try{
    const student = action.payload;
    console.log('student is:', student);
    yield putStudent(student);
    yield put({type:PERSON_ACTIONS.UPDATE_STUDENT_COMPLETE});

  } catch(error){
    console.log('error in updateStudent Saga:', error);
    
  }
}

function* personSaga() {
  yield takeLatest(PERSON_ACTIONS.FETCH_STUDENT, fetchStudent);
  yield takeLatest(PERSON_ACTIONS.UPDATE_STUDENT, updateStudent)
}

export default personSaga;
