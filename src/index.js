import React from 'react';
import ReactDOM from 'react-dom';
import store from './core/store';
import {firebaseAuth} from './core/firebase';
import {authInit} from './core/auth/actions';
import Main from './views/Main';

const render = (Main) => {
  ReactDOM.render(
    <Main />,
    document.getElementById('root')
  );
}

const initializeAuth = (dispatch) => {
  return new Promise((resolve, reject) => {
    const unsub = firebaseAuth.onAuthStateChanged(
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
