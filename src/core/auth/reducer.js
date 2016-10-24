import {
  AUTH_INIT,
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_ERROR,
  AUTH_LOGOUT_SUCCESS
} from './action-types';

const initialState = {
  uid: null,
  error: null
};

export function authReducer(state = initialState, {type, payload}) {
  switch (type) {
    case AUTH_INIT:
      return {...state, uid: payload ? payload.uid : null};

    case AUTH_LOGIN_ERROR:
    case AUTH_LOGOUT_ERROR:
      return {...state, error: payload};

    case AUTH_LOGIN_SUCCESS:
      return {...state, uid: payload.uid, error: null};

    case AUTH_LOGOUT_SUCCESS:
      return {...state, uid: null, error: null};

    default:
      return state;
  }
};
