import {postList} from './post-list';
import {
  LOAD_PUBLISHED_POSTS_SUCCESS,
  UNLOAD_PUBLISHED_POSTS_SUCCESS,
} from './action-types';

export function loadPublishedPostsSuccess(result) {
  return {
    type: LOAD_PUBLISHED_POSTS_SUCCESS,
    payload: result
  };
}

export function loadPublishedPosts() {
  return dispatch => {
    postList.subscribe(dispatch);
  };
}

export function unloadPublishedPosts() {
  postList.unsubscribe();
  return {
    type: UNLOAD_PUBLISHED_POSTS_SUCCESS
  };
}
