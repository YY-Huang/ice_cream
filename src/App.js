import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

// Reducers
import rootReducer from './redux/reducers/rootReducer';

// Components
import QueryForm from './components/QueryForm'
import Chart from './components/Chart';

// Sagas
import rootSaga from './redux/sagas';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(logger, sagaMiddleware))
sagaMiddleware.run(rootSaga)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <QueryForm />
          <Chart />
        </div>
      </Provider>
    )
  }
}

export default App;
