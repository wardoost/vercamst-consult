import { FirebaseList } from '../firebase';
import * as postsActions from './actions';

export const postList = new FirebaseList({
  onLoad: postsActions.loadPostsSuccess,
  onChange: postsActions.updatePostSuccess,
  onRemove: postsActions.deletePostSuccess
}, 'posts');
