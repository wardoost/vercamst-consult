import {
  LOAD_PUBLISHED_POSTS_SUCCESS,
  LOAD_MORE_PUBLISHED_POSTS_SUCCESS,
  LAST_PAGE_PUBLISHED_POSTS,
  RESET_PUBLISHED_POSTS,
  UNLOAD_PUBLISHED_POSTS_SUCCESS,
} from './action-types';

const initialState = {
  posts: [],
  loading: true,
  onLastPage: false,
}

export default function(state = initialState, {type, payload}) {
  switch (type) {
    case LOAD_PUBLISHED_POSTS_SUCCESS:
      return {...state, posts: payload, loading: false}

    case LOAD_MORE_PUBLISHED_POSTS_SUCCESS:
      return {...state, posts: state.posts.concat(payload), loading: false}

    case LAST_PAGE_PUBLISHED_POSTS:
      return {...state, onLastPage: true}

    case RESET_PUBLISHED_POSTS:
      return {...state, posts: payload, onLastPage: false}

    case UNLOAD_PUBLISHED_POSTS_SUCCESS:
      return {...state, posts: [], loading: true}

    default:
      return state;
  }
}
