import { database } from '../firebase';

export const actionTypes = {
  FETCH_POSTS_SUCCESS_ERROR: "FETCH_POSTS_ERROR",
  FETCH_POSTS_SUCCESS: "FETCH_POSTS_SUCCESS",
}

const fetchPostsError = (error) => {
  return {
    type: actionTypes.FETCH_POSTS_ERROR,
    payload: error
  };
}

const fetchPostsSuccess = (result) => {
  return {
    type: actionTypes.FETCH_POSTS_SUCCESS,
    payload: result
  };
}

export const fetchPosts = (id) => {
  return dispatch => {
    database.ref('posts').once('value')
      .then(snapshot => dispatch(fetchPostsSuccess(snapshot.val())))
      .catch(error => dispatch(fetchPostsError(error)));
  };
}
