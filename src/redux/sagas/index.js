import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import personSaga from './personSaga';
import bookingSaga from './bookingSaga'
import lessonSaga from './lessonSaga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    personSaga(),
    bookingSaga(),
    lessonSaga(),
    // watchIncrementAsync()
  ]);
}
