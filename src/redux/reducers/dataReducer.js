import {
    CLEAR_DATA_FROM_STORE,
    PERSIST_DATA_TO_STORE
} from '../constants';

const initialState = {
    data: [],
};

function dataReducer (state = initialState, action) {
    switch (action.type) {
        case CLEAR_DATA_FROM_STORE:
          return initialState

        case PERSIST_DATA_TO_STORE:
          return {
            ...state,
            data: [
              ...state.data,
              ...action.payload
            ]
          }
        default:
          return state;
    }
};

export default dataReducer;