import { database } from '../../utils/firebase';

export const FETCH_POST = "FETCH_POST";

export function fetchPost(id) {
  const request = database.ref('posts/' + id).once('value').then((snapshot) => {
    return snapshot.val();
  });

  return {
    type: FETCH_POST,
    payload: request
  }
}
