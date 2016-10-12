import C from '../../constants';
import { database } from '../../utils/firebase';

export function fetchPosts() {
  const request = database.ref('posts').once('value').then((snapshot) => {
    return snapshot.val();
  });

  return {
    type: C.FETCH_POSTS,
    payload: request
  }
}
