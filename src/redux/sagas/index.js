import { all } from 'redux-saga/effects';
import watchInitateNewSimulationSaga from './simulation';

export default function* rootSaga() {
  yield all([
    watchInitateNewSimulationSaga(),
  ]);
};