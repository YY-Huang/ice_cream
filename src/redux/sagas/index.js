import { all } from 'redux-saga/effects';
import watchInitiateNewSimulationSaga from './data';

export default function* rootSaga() {
  yield all([
    watchInitiateNewSimulationSaga(),
  ]);
};