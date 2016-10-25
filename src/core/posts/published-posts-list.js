import { firebaseDb, FirebaseList } from '../firebase';
import * as postsActions from './actions';

const ref = firebaseDb.ref('posts').orderByChild("published").equalTo(true);

export const publishedPostsList = new FirebaseList({
  onLoad: postsActions.loadPublishedPostsSuccess
}, ref);
