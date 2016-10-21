import { database } from '../firebase';

export const actionTypes = {
  FETCH_POST_ERROR: "FETCH_POST_ERROR",
  FETCH_POST_SUCCESS: "FETCH_POST_SUCCESS",
  CREATE_POST_ERROR: "CREATE_POST_ERROR",
  CREATE_POST_SUCCESS: "CREATE_POST_SUCCESS",
  DELETE_POST_ERROR: "DELETE_POST_ERROR",
  DELETE_POST_SUCCESS: "DELETE_POST_SUCCESS",
  FETCH_POSTS_SUCCESS: "FETCH_POSTS_SUCCESS",
}

function fetchPostError(error) {
  return {
    type: actionTypes.FETCH_POST_ERROR,
    payload: error
  };
}

function fetchPostSuccess(result) {
  return {
    type: actionTypes.FETCH_POST_SUCCESS,
    payload: result
  };
}

export function fetchPost(id) {
  return dispatch => {
    database.ref('posts/' + id).once('value')
      .then(snapshot => dispatch(fetchPostSuccess(snapshot.val())))
      .catch(error => dispatch(fetchPostError(error)));
  };
}

function createPostError(error) {
  return {
    type: actionTypes.CREATE_POST_ERROR,
    payload: error
  };
}

function createPostSuccess(post) {
  return {
    type: actionTypes.CREATE_POST_SUCCESS,
    payload: post
  };
}

export function createPost(post) {
  return dispatch => {
    const newKey = database.ref('posts').push().key;

    database.ref('posts/' + newKey).set(post)
      .then(() => dispatch(createPostSuccess(post)))
      .catch(error => dispatch(createPostError(error)));
  };
}

function deletePostError(error) {
  return {
    type: actionTypes.DELETE_POST_ERROR,
    payload: error
  };
}

function deletePostSuccess() {
  return {
    type: actionTypes.DELETE_POST_SUCCESS,
    payload: null
  };
}

export function deletePost(id) {
  return dispatch => {
    database.ref('posts/' + id).remove()
      .then(() => dispatch(deletePostSuccess(id)))
      .catch((error) => dispatch(deletePostError(error)));
  };
}

function fetchPostsSuccess(result) {
  return {
    type: actionTypes.FETCH_POSTS_SUCCESS,
    payload: result
  };
}

export function fetchPosts(id) {
  return dispatch => {
    database.ref('posts').on('value', (snapshot) => {
      dispatch(fetchPostsSuccess(snapshot.val()))
    });
  };
}
