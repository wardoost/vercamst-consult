import { FirebaseList } from '../firebase';
import * as postActions from './actions';

export const postList = new FirebaseList({
  onLoad: postActions.loadPublishedPostsSuccess
}, 'posts', {orderByChild: 'published', equalTo: true});
