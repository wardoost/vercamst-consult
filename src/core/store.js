import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

let middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
  const logger = require('redux-logger');
  middleware = [...middleware, logger()];
} else {
  middleware = [...middleware];
}

const store = createStore(reducers, {}, applyMiddleware(...middleware));

export default store;
