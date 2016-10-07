import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import allReducers from './reducers/index';

const middleware = applyMiddleware(promise(), thunk, logger());

const store = createStore(allReducers, {}, middleware);

export default store;
