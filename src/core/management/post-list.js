import {FirebaseList} from '../firebase';
import * as postActions from './actions';

export const postList = new FirebaseList({
  onAdd: postActions.createPostSuccess,
  onLoad: postActions.loadPostsSuccess,
  onChange: postActions.updatePostSuccess,
  onRemove: postActions.deletePostSuccess
}, 'posts');
