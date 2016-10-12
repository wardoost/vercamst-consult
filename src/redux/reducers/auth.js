import C from '../../constants';

const initialState = {
  uid: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case C.AUTH_INIT:
      return {...state, uid: action.payload ? action.payload.uid : null};
    case C.AUTH_LOGIN_ERROR:
      return {...state, uid: null, error: action.payload};
    case C.AUTH_LOGIN_SUCCESS:
      return {...state, uid: action.payload.uid, error: null};
    case C.AUTH_LOGOUT_ERROR:
      return {...state, error: action.payload};
    case C.AUTH_LOGOUT_SUCCESS:
      return {...state, uid: null};
    default:
      return state;
  }
};
