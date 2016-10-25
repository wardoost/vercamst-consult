import {
  LOAD_POST_ERROR,
  LOAD_POST_SUCCESS,
  CREATE_POST_ERROR,
  CREATE_POST_SUCCESS,
} from './action-types';

const initialState = {
  post: null,
  error: null,
}

export default function(state = initialState, {type, payload}) {
  switch (type) {
    case LOAD_POST_ERROR:
    case CREATE_POST_ERROR:
      return {...state, error: payload}

    case LOAD_POST_SUCCESS:
    case CREATE_POST_SUCCESS:
      return {...state, post: payload, error: null}

    default:
      return state;
  }
}
