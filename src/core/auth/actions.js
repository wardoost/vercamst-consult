import { firebaseAuth } from '../firebase';
import {
  AUTH_INIT,
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_ERROR,
  AUTH_LOGOUT_SUCCESS
} from './action-types';

export function authInit(user) {
  return {
    type: AUTH_INIT,
    payload: user
  };
}

function loginError(error) {
  return {
    type: AUTH_LOGIN_ERROR,
    payload: error
  };
}

function loginSuccess(result) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: result
  };
}

export function authLogin(email, password) {
  return dispatch => {
    firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(result => dispatch(loginSuccess(result)))
      .catch(error => dispatch(loginError(error)));
  };
}

function logoutError() {
  return {
    type: AUTH_LOGOUT_ERROR
  };
}

function logoutSuccess() {
  return {
    type: AUTH_LOGOUT_SUCCESS
  };
}

export function authLogout() {
  return (dispatch) => {
    firebaseAuth.signOut()
      .then(() => dispatch(logoutSuccess()))
      .catch(error => dispatch(logoutError(error)));
  };
}
