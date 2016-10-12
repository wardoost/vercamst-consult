import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store';
import {auth} from './utils/firebase';
import {authInit} from './redux/actions/auth';
import Main from './components/Main';

const render = (Main) => {
  ReactDOM.render(
    <Main />,
    document.getElementById('root')
  );
}

const initializeAuth = (dispatch) => {
  return new Promise((resolve, reject) => {
    const unsub = auth.onAuthStateChanged(
      user => {
        dispatch(authInit(user));
        unsub();
        resolve();
      },
      error => reject(error)
    );
  });
}

initializeAuth(store.dispatch)
  .then(() => render(Main))
  .catch(error => console.error(error));
