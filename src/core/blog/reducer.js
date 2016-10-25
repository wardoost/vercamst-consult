import {
  LOAD_PUBLISHED_POSTS_SUCCESS,
  UNLOAD_PUBLISHED_POSTS_SUCCESS,
} from './action-types';

const initialState = {
  posts: []
}

export default function(state = initialState, {type, payload}) {
  switch (type) {
    case LOAD_PUBLISHED_POSTS_SUCCESS:
      return {...state, posts: payload.reverse()}

    case UNLOAD_PUBLISHED_POSTS_SUCCESS:
      return {...state, posts: []}

    default:
      return state;
  }
}
