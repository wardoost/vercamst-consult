import { database } from '../firebase';

export const actionTypes = {
  FETCH_POST_ERROR: "FETCH_POST_ERROR",
  FETCH_POST_SUCCESS: "FETCH_POST_SUCCESS",
  CREATE_POST_ERROR: "CREATE_POST_ERROR",
  CREATE_POST_SUCCESS: "CREATE_POST_SUCCESS",
  DELETE_POST_ERROR: "DELETE_POST_ERROR",
  DELETE_POST_SUCCESS: "DELETE_POST_SUCCESS",
  PUBLISH_POST_ERROR: "PUBLISH_POST_ERROR",
  PUBLISH_POST_SUCCESS: "PUBLISH_POST_SUCCESS",
  DEPUBLISH_POST_ERROR: "DEPUBLISH_POST_ERROR",
  DEPUBLISH_POST_SUCCESS: "DEPUBLISH_POST_SUCCESS",
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
    database.ref("posts/" + id).once("value")
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
    const newKey = database.ref("posts").push().key;

    database.ref("posts/" + newKey).set(post)
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
    database.ref("posts/" + id).remove()
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

export function fetchPosts(all = false) {
  return dispatch => {
    let postsRef = database.ref("posts");

    if (!all) {
      postsRef = postsRef.orderByChild("published").equalTo(true);
    }

    postsRef.on("value", (snapshot) => {
      dispatch(fetchPostsSuccess(snapshot.val()))
    });
  };
}

function publishPostError(error) {
  return {
    type: actionTypes.PUBLISH_POST_ERROR,
    payload: error
  };
}

function publishPostSuccess(id) {
  return {
    type: actionTypes.PUBLISH_POST_SUCCESS,
    payload: id
  };
}

export function publishPost(id) {
  return dispatch => {
    database.ref("posts/" + id + "/published").set(true)
      .then(() => dispatch(publishPostSuccess(id)))
      .catch(error => dispatch(publishPostError(error)));
  };
}

function depublishPostError(error) {
  return {
    type: actionTypes.DEPUBLISH_POST_ERROR,
    payload: error
  };
}

function depublishPostSuccess(id) {
  return {
    type: actionTypes.DEPUBLISH_POST_SUCCESS,
    payload: id
  };
}

export function depublishPost(id) {
  return dispatch => {
    database.ref("posts/" + id + "/published").set(false)
      .then(() => dispatch(depublishPostSuccess(id)))
      .catch(error => dispatch(depublishPostError(error)));
  };
}
