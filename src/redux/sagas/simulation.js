import { takeLeading, call, select, put } from 'redux-saga/effects';
import { INITIATE_NEW_SIMULATION, INITIATE_NEW_SIMULATION_SUCCESS, INITIATE_NEW_SIMULATION_FAILURE, PERSIST_DATA_TO_STORE } from '../constants';
import createCustomers  from './../../utils/populateQuery';
// console.log(createCustomers)

function* initiateNewSimulationSaga(payload) {
    const { 
        options : {
            customerTime,
            coneMakingTime,
            workHours,
            numberOfSimulations
        } 
    } = payload;
    console.log('payload is', payload)

    const page = 50;
    let counter = 0;

    try {
        while (counter < numberOfSimulations) {
            const customers = []
    
            for (let i = 0; i <= page; i++) {
                const newCustomers = yield call(createCustomers(customerTime, coneMakingTime, workHours))
                customers.push(newCustomers)
            }
            yield put({
                type: PERSIST_DATA_TO_STORE,
                payload: customers
            })
            counter++
        }
    
        yield put({
            type: INITIATE_NEW_SIMULATION_SUCCESS
        })
    } catch (err) {
        yield put({
            type: INITIATE_NEW_SIMULATION_FAILURE,
            payload: err,
        })
    }

}

export default function* watchInitateNewSimulationSaga() {
    yield takeLeading(INITIATE_NEW_SIMULATION, initiateNewSimulationSaga)
};