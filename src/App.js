import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers/rootReducer'

const store = createStore(rootReducer)

const App = () => {
  return (
    <Provider store={store}>
      <div>
        This is the app
      </div>
    </Provider>
  )
}

export default App;
