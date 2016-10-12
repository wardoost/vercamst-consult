import C from '../../constants';
import { database } from '../../utils/firebase';

const fetchPostsError = (error) => {
  return {
    type: C.FETCH_POSTS_ERROR,
    payload: error
  };
}

const fetchPostsSuccess = (result) => {
  return {
    type: C.FETCH_POSTS_SUCCESS,
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
