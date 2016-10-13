import {actionTypes} from './actions';

const initialState = {
  post: null,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_POST_ERROR:
      return {...state, post: null, error: action.payload};
    case actionTypes.FETCH_POST_SUCCESS:
      return {...state, post: action.payload, error: null};
    default:
      return state;
  }
}
