import { database } from '../firebase';

export const actionTypes = {
  FETCH_POST_ERROR: "FETCH_POST_ERROR",
  FETCH_POST_SUCCESS: "FETCH_POST_SUCCESS",
}

const fetchPostError = (error) => {
  return {
    type: actionTypes.FETCH_POST_ERROR,
    payload: error
  };
}

const fetchPostSuccess = (result) => {
  return {
    type: actionTypes.FETCH_POST_SUCCESS,
    payload: result
  };
}

export const fetchPost = (id) => {
  return dispatch => {
    database.ref('posts/' + id).once('value')
      .then(snapshot => dispatch(fetchPostSuccess(snapshot.val())))
      .catch(error => dispatch(fetchPostError(error)));
  };
}
