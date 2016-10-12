import C from '../../constants';
import { auth } from '../../utils/firebase';

const loginError = (error) => {
  return {
    type: C.AUTH_LOGIN_ERROR,
    payload: error
  };
}

const loginSuccess = (result) => {
  return {
    type: C.AUTH_LOGIN_SUCCESS,
    payload: result
  };
}

export const authLogin = (email, password) => {
  return dispatch => {
    auth.signInWithEmailAndPassword(email, password)
      .then(result => dispatch(loginSuccess(result)))
      .catch(error => dispatch(loginError(error)));
  };
}

export const authInit = (user) => {
  return {
    type: C.AUTH_INIT,
    payload: user
  };
}

const logoutError = () => {
  return {
    type: C.AUTH_LOGOUT_ERROR
  };
}

const logoutSuccess = () => {
  return {
    type: C.AUTH_LOGOUT_SUCCESS
  };
}

export const authLogout = () => {
  return (dispatch) => {
    auth.signOut()
      .then(() => dispatch(logoutSuccess()))
      .catch(error => dispatch(logoutError(error)));
  };
}
