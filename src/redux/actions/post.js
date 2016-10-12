import C from '../../constants';
import { database } from '../../utils/firebase';

export function fetchPost(id) {
  const request = database.ref('posts/' + id).once('value').then((snapshot) => {
    return snapshot.val();
  });

  return {
    type: C.FETCH_POST,
    payload: request
  }
}
