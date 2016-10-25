import {postList} from './post-list';
import {
  UPDATE_POST_ERROR,
  UPDATE_POST_SUCCESS,
  DELETE_POST_ERROR,
  DELETE_POST_SUCCESS,
  LOAD_POSTS_SUCCESS,
  UNLOAD_POSTS_SUCCESS,
} from './action-types';



function deletePostError(error) {
  return {
    type: DELETE_POST_ERROR,
    payload: error
  };
}

export function deletePostSuccess(post) {
  return {
    type: DELETE_POST_SUCCESS,
    payload: post
  };
}

export function deletePost(post) {
  return dispatch => {
    postList.remove(post.key)
      .catch(error => dispatch(deletePostError(error)));
  };
}

function updatePostError(error) {
  return {
    type: UPDATE_POST_ERROR,
    payload: error
  };
}

export function updatePostSuccess(post) {
  return {
    type: UPDATE_POST_SUCCESS,
    payload: post
  };
}

export function updatePost(post, changes) {
  return dispatch => {
    postList.update(post.key, changes)
      .catch(error => dispatch(updatePostError(error)));
  };
}

export function loadPostsSuccess(result) {
  return {
    type: LOAD_POSTS_SUCCESS,
    payload: result
  };
}

export function loadPosts() {
  return dispatch => {
    postList.subscribe(dispatch);
  };
}

export function unloadPosts() {
  postList.unsubscribe();
  return {
    type: UNLOAD_POSTS_SUCCESS
  };
}
