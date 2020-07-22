import { takeLeading, call, select, put } from 'redux-saga/effects';
import { INITIATE_NEW_SIMULATION } from '../constants';
import 

function* initiateNewSimulationSaga(payload) {
  // do things
  const { options } = payload;

    
}

export default function* watchInitateNewSimulationSaga() {
    yield takeLeading(INITIATE_NEW_SIMULATION, initiateNewSimulationSaga)
};