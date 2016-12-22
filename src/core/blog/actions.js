import {postList} from './post-list';
import {
  LOAD_PUBLISHED_POSTS_SUCCESS,
  LOAD_MORE_PUBLISHED_POSTS_SUCCESS,
  LAST_PAGE_PUBLISHED_POSTS,
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

export function loadMorePublishedPostsSuccess(result) {
  return {
    type: LOAD_MORE_PUBLISHED_POSTS_SUCCESS,
    payload: result
  };
}

export function loadMorePublishedPosts() {
  return dispatch => {
    postList.loadMore(dispatch);
  }
}

export function unloadPublishedPosts() {
  postList.unsubscribe();
  return {
    type: UNLOAD_PUBLISHED_POSTS_SUCCESS
  };
}

export function lastPagePublishedPosts(){
  return {
    type: LAST_PAGE_PUBLISHED_POSTS
  };
}
