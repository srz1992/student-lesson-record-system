import { put, takeLatest } from 'redux-saga/effects';
import { LESSON_ACTIONS } from '../actions/lessonActions';
import {callLessons, putLesson} from '../requests/lessonRequests';

function* fetchLessons(action){
    const student_id = action.payload;
    try{
        const lessons = yield callLessons(student_id);
        yield put({type:LESSON_ACTIONS.SET_LESSON_RECORDS, lessons})
    }catch(error){
        console.log('error in fetchLessons in lessonSaga:', error);
    }
}

function* updateLessonRecord(action){
    const student_id = action.payload.student_id;
    try{
        yield putLesson(action.payload);
        yield put({type:LESSON_ACTIONS.FETCH_LESSON_RECORDS, payload: student_id})
    }catch(error){
        console.log('error in updateLessonRecord:', error);
    }
}

function* lessonSaga() {
//   yield takeLatest(PERSON_ACTIONS.FETCH_STUDENT, fetchStudent);
     yield takeLatest(LESSON_ACTIONS.FETCH_LESSON_RECORDS, fetchLessons);
     yield takeLatest(LESSON_ACTIONS.UPDATE_LESSON_RECORD, updateLessonRecord);
}

export default lessonSaga;
