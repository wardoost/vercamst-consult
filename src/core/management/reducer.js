import {
  UPDATE_POST_ERROR,
  UPDATE_POST_SUCCESS,
  DELETE_POST_ERROR,
  DELETE_POST_SUCCESS,
  LOAD_POSTS_SUCCESS,
  UNLOAD_POSTS_SUCCESS,
} from './action-types';

const initialState = {
  posts: [],
  loading: true,
  error: null,
}

export default function(state = initialState, {type, payload}) {
  switch (type) {
    case LOAD_POSTS_SUCCESS:
      return {...state, posts: payload, error: null, loading: false}

    case UNLOAD_POSTS_SUCCESS:
      return {...state, posts: [], error: null, loading: true}

    case UPDATE_POST_ERROR:
    case DELETE_POST_ERROR:
      return {...state, error: payload, loading: false}

    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post => {
          return post.key === payload.key ? payload : post;
        }),
        error: null
      }

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter(post => post.key !== payload.key),
        error: null
      }

    default:
      return state;
  }
}
