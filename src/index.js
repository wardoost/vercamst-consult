import React from 'react';
import ReactDOM from 'react-dom';
import store from './core/store';
import {initAuth} from './core/auth';
import Main from './views/Main';

const render = (Main) => {
  ReactDOM.render(
    <Main />,
    document.getElementById('root')
  );
}

initAuth(store.dispatch)
  .then(() => render(Main))
  .catch(error => console.error(error));
