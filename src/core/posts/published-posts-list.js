import { FirebaseList } from '../firebase';
import * as postsActions from './actions';

export const publishedPostsList = new FirebaseList({
  onLoad: postsActions.loadPublishedPostsSuccess
}, 'posts', {attribute: "published", value: true});
