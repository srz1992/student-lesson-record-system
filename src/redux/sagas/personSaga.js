import { put, takeLatest } from 'redux-saga/effects';
import { PERSON_ACTIONS } from '../actions/personActions';
import { callStudent, putStudent, callTeacher, putTeacher } from '../requests/personRequests';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchStudent(action) {
  try {
    const student = yield callStudent(action.payload);
    console.log('student is:', student);
    if (student !== ''){
      yield put({
        type: PERSON_ACTIONS.SET_STUDENT,
        student,
      });
    }
    else {
      yield put({
        type: PERSON_ACTIONS.FETCH_STUDENT_FALIURE
      })
    }
    
  } catch (error) {
    yield put({
      type: PERSON_ACTIONS.FETCH_STUDENT_FALIURE
    })
    console.log('error in fetchStudent saga:', error);
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

function* fetchTeacher(action){
  try{
    const teacher= yield callTeacher(action.payload);
    yield put({
      type: PERSON_ACTIONS.SET_TEACHER,
      teacher
    })
  }
  catch(error){
    console.log('error in fetchTeacher saga:', error);
    yield put({
      type: PERSON_ACTIONS.FETCH_TEACHER_FAILURE
    })
  }
}

function* updateTeacher(action){
  try{
    const teacher = action.payload;
    console.log('teacher is:', teacher);
    yield putTeacher(teacher);
    yield put({type:PERSON_ACTIONS.UPDATE_TEACHER_COMPLETE});
    
  }
  catch(error){
    console.log('error in updateTeacher saga:', error);
    
  }
}

function* personSaga() {
  yield takeLatest(PERSON_ACTIONS.FETCH_STUDENT, fetchStudent);
  yield takeLatest(PERSON_ACTIONS.UPDATE_STUDENT, updateStudent)
  yield takeLatest(PERSON_ACTIONS.FETCH_TEACHER, fetchTeacher)
  yield takeLatest(PERSON_ACTIONS.UPDATE_TEACHER, updateTeacher)
}

export default personSaga;
