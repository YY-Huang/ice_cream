import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

// Reducers
import rootReducer from './redux/reducers/rootReducer';

// Components
import QueryForm from './components/QueryForm'

// Sagas
// import rootSaga from './redux/sagas';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
// sagaMiddleware.run(rootSaga)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          This is the app
          {console.log('these are my props', this.props)}
          <QueryForm state={this.props}/>
        </div>
      </Provider>
    )
  }
}

// const App = () => {
//     return (
//       <Provider store={store}>
//         <div>
//           This is the app
  
//           <QueryForm onSubmit={handleSubmit}/>
//         </div>
//       </Provider>
//     )
// }

export default App;
