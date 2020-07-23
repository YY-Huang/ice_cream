import {
    INITIATE_NEW_SIMULATION,
    CLEAR_DATA_FROM_STORE,
    PERSIST_DATA_TO_STORE,
  } from '../constants';
  
  export const initiateNewSimulation = (options) => {
    return {
      type: INITIATE_NEW_SIMULATION,
      payload: {
          options,
      }

    };
  };
  
  export const clearDataFromStore = () => {
    return {
      type: CLEAR_DATA_FROM_STORE,
    };
  };
  
  export const persistDataToStore = data => {
    return {
      type: PERSIST_DATA_TO_STORE,
      payload: data,
    };
  };