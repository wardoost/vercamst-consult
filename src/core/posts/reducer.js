import {
  LOAD_POST_ERROR,
  LOAD_POST_SUCCESS,
  CREATE_POST_ERROR,
  CREATE_POST_SUCCESS,
  UPDATE_POST_ERROR,
  UPDATE_POST_SUCCESS,
  DELETE_POST_ERROR,
  DELETE_POST_SUCCESS,
  LOAD_POSTS_SUCCESS,
  UNLOAD_POSTS_SUCCESS
} from './action-types';

const initialState = {
  post: null,
  postList: [],
  error: null,
}

export function postsReducer(state = initialState, {type, payload}) {
  switch (type) {
    case LOAD_POST_ERROR:
    case CREATE_POST_ERROR:
    case UPDATE_POST_ERROR:
    case DELETE_POST_ERROR:
      return {...state, error: payload}

    case LOAD_POST_SUCCESS:
    case CREATE_POST_SUCCESS:
      return {...state, post: payload, error: null}

    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        postList: state.postList.map(post => {
          return post.key === payload.key ? payload : post;
        }),
        error: null
      }

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        postList: state.postList.filter(post => post.key !== payload.key),
        error: null
      }

    case LOAD_POSTS_SUCCESS:
      return {...state, postList: payload, post: null, error: null}

    case UNLOAD_POSTS_SUCCESS:
      return {...state, postList: [], error: null}

    default:
      return state;
  }
}
