import { firebaseAuth } from '../firebase';

export const actionTypes = {
  AUTH_INIT: "AUTH_INIT",
  AUTH_LOGIN_ERROR: "AUTH_LOGIN_ERROR",
  AUTH_LOGIN_SUCCESS: "AUTH_LOGIN_SUCCESS",
  AUTH_LOGOUT_ERROR: "AUTH_LOGOUT_ERROR",
  AUTH_LOGOUT_SUCCESS: "AUTH_LOGOUT_SUCCESS",
}

export const authInit = (user) => {
  return {
    type: actionTypes.AUTH_INIT,
    payload: user
  };
}

const loginError = (error) => {
  return {
    type: actionTypes.AUTH_LOGIN_ERROR,
    payload: error
  };
}

const loginSuccess = (result) => {
  return {
    type: actionTypes.AUTH_LOGIN_SUCCESS,
    payload: result
  };
}

export const authLogin = (email, password) => {
  return dispatch => {
    firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(result => dispatch(loginSuccess(result)))
      .catch(error => dispatch(loginError(error)));
  };
}

const logoutError = () => {
  return {
    type: actionTypes.AUTH_LOGOUT_ERROR
  };
}

const logoutSuccess = () => {
  return {
    type: actionTypes.AUTH_LOGOUT_SUCCESS
  };
}

export const authLogout = () => {
  return (dispatch) => {
    firebaseAuth.signOut()
      .then(() => dispatch(logoutSuccess()))
      .catch(error => dispatch(logoutError(error)));
  };
}
