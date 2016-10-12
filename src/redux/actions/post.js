import C from '../../constants';
import { database } from '../../utils/firebase';

const fetchPostError = (error) => {
  return {
    type: C.FETCH_POST_ERROR,
    payload: error
  };
}

const fetchPostSuccess = (result) => {
  return {
    type: C.FETCH_POST_SUCCESS,
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
