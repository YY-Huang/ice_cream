import {
    SET_MEAN_ARRIVAL_TIME,
    SET_MEAN_CONE_MAKING_TIME,
    SET_MEAN_WORK_MINUTES,
    SET_NUMBER_SIMULATIONS
} from '../constants';

const initialState = {
    meanArrivalTime: 7,
    meanConeMakingTime: 7,
    meanWorkMinutes: 420,
    numberSimulations: 1001
};

function setSimulationReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MEAN_ARRIVAL_TIME:
          return {
            ...state,
            meanArrivalTime: action.payload
          }

        case SET_MEAN_CONE_MAKING_TIME:
          return {
            ...state,
            meanConeMakingTime: action.payload
          }

        case SET_MEAN_WORK_MINUTES:
          return {
            ...state,
            meanWorkMinutes: action.payload
          }

        case SET_NUMBER_SIMULATIONS:
          return {
            ...state,
            numberSimulations: action.payload
          }

        default:
          return state;
    }
};

export default setSimulationReducer;