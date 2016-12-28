import React from 'react';
import { render } from 'react-dom';
import store from './core/store';
import {initAuth} from './core/auth';
import App from './views/App';

const rootEl = document.getElementById('root');

initAuth(store.dispatch)
  .then(() => {
    render(
      <App />,
      rootEl
    );
  })
  .catch(error => console.error(error));

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default;
    render(
      <NextApp />,
      rootEl
    );
  });
}
