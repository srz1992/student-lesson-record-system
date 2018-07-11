import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import personSaga from './personSaga'

export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    personSaga(),
    // watchIncrementAsync()
  ]);
}
