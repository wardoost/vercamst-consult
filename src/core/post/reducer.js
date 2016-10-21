import {actionTypes} from './actions';

const initialState = {
  post: null,
  posts: null,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_POST_ERROR:
    case actionTypes.CREATE_POST_ERROR:
    case actionTypes.DELETE_POST_ERROR:
    case actionTypes.PUBLISH_POST_ERROR:
    case actionTypes.DEPUBLISH_POST_ERROR:
      return {...state, post: null, error: action.payload};
    case actionTypes.FETCH_POST_SUCCESS:
    case actionTypes.CREATE_POST_SUCCESS:
    case actionTypes.DELETE_POST_SUCCESS:
    case actionTypes.PUBLISH_POST_SUCCESS:
    case actionTypes.DEPUBLISH_POST_SUCCESS:
      return {...state, post: action.payload, error: null};
    case actionTypes.FETCH_POSTS_ERROR:
      return {...state, posts: null, error: action.payload};
    case actionTypes.FETCH_POSTS_SUCCESS:
      return {...state, posts: action.payload, error: null};
    default:
      return state;
  }
}
