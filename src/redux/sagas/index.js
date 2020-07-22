import { all } from 'redux-saga/effects';
import { watchReceiveDataSaga } from './data';

export default function* rootSaga() {
  yield all([
    watchReceiveDataSaga(),
  ]);
};