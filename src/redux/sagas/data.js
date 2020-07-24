import { takeLeading, call, put } from 'redux-saga/effects';
import { INITIATE_NEW_SIMULATION, INITIATE_NEW_SIMULATION_SUCCESS, INITIATE_NEW_SIMULATION_FAILURE, PERSIST_DATA_TO_STORE, CLEAR_DATA_FROM_STORE } from '../constants';
import createCustomers  from './../../utils/populateQuery';
// console.log(createCustomers)
function* initiateNewSimulationSaga({ payload }) {
    const { 
        options : {
            customerTime,
            coneMakingTime,
            workHours,
            numberOfSimulations
        } 
    } = payload;

    console.log('customer time', typeof(customerTime))
    console.log('coneMakingTime', typeof(coneMakingTime))
    console.log('workHours', typeof(workHours))

    // clear any previous data when starting a new run
    yield put({
        type: CLEAR_DATA_FROM_STORE,
    });

    let counter = 0;
    const startTime = Date.now();
    try {
        const customers = [];
        while (counter < numberOfSimulations) {
            // console.log('coneMakingTime2', typeof(coneMakingTime))
            const newCustomers = yield call(createCustomers, customerTime, coneMakingTime, workHours);
            customers.push(newCustomers);
            counter++;
        };
        yield put({
            type: PERSIST_DATA_TO_STORE,
            payload: customers,
        });
        const endTime = Date.now();
        const msDifference = endTime - startTime;
        yield put({
            type: INITIATE_NEW_SIMULATION_SUCCESS,
            payload: {
                timeElapsed: msDifference,
            },
        });
    } catch (err) {
        yield put({
            type: INITIATE_NEW_SIMULATION_FAILURE,
            payload: err,
        });
    };
}
export default function* watchInitiateNewSimulationSaga() {
    yield takeLeading(INITIATE_NEW_SIMULATION, initiateNewSimulationSaga)
};