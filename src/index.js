import React from 'react';
import ReactDOM from 'react-dom';
import Router from './components/core/Router';
import {Provider} from 'react-redux';
import store from './redux/store';
import {fetchPosts} from './redux/actions/posts';

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);

// Test action
store.dispatch(fetchPosts());
