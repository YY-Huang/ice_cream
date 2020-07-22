import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

// Reducers
import rootReducer from './redux/reducers/rootReducer';

// Components
import QueryForm from './components/QueryForm'

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
          This is the app
          <QueryForm />
        </div>
      </Provider>
    )
  }
}

export default App;
