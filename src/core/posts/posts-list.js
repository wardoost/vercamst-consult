import { firebaseDb, FirebaseList } from '../firebase';
import * as postsActions from './actions';

const ref = firebaseDb.ref('posts');

export const postsList = new FirebaseList({
  onLoad: postsActions.loadPostsSuccess,
  onChange: postsActions.updatePostSuccess,
  onRemove: postsActions.deletePostSuccess
}, ref);
