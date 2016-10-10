import { database } from '../../utils/firebase';

export const FETCH_POSTS = "FETCH_POSTS";

export function fetchPosts() {
  const request = database.ref('posts').once('value').then((snapshot) => {
    return snapshot.val();
  });

  return {
    type: FETCH_POSTS,
    payload: request
  }
}
