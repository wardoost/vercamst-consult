import React from 'react';
import ReactDOM from 'react-dom';
import Router from './components/core/Router';
import {Provider} from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);
