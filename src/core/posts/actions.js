import { database } from '../firebase';

export const actionTypes = {
  FETCH_POSTS_SUCCESS: "FETCH_POSTS_SUCCESS",
}

const fetchPostsSuccess = (result) => {
  return {
    type: actionTypes.FETCH_POSTS_SUCCESS,
    payload: result
  };
}

export const fetchPosts = (id) => {
  return dispatch => {
    database.ref('posts').on('value', (snapshot) => {
      dispatch(fetchPostsSuccess(snapshot.val()))
    });
  };
}
