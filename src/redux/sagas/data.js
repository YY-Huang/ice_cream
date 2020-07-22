import { take, actionChannel, call } from 'redux-saga/effects';
import { RECEIVE_DATA } from '../constants';

function* receiveDataSaga(payload) {
  // do things
}

export default function* watchReceiveDataSaga() {
  const channel = yield actionChannel(RECEIVE_DATA);

  while (true) {
    const { payload } = yield take(channel);
    yield call(receiveDataSaga, payload);
  };
};