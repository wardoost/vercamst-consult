import {actionTypes} from './actions';

const initialState = {
  uid: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_INIT:
      return {...state, uid: action.payload ? action.payload.uid : null};
    case actionTypes.AUTH_LOGIN_ERROR:
      return {...state, uid: null, error: action.payload};
    case actionTypes.AUTH_LOGIN_SUCCESS:
      return {...state, uid: action.payload.uid, error: null};
    case actionTypes.AUTH_LOGOUT_ERROR:
      return {...state, error: action.payload};
    case actionTypes.AUTH_LOGOUT_SUCCESS:
      return {...state, uid: null};
    default:
      return state;
  }
};
