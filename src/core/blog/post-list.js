import {FirebasePaginatedList} from '../firebase';
import * as postActions from './actions';

export const postList = new FirebasePaginatedList({
  onReady: postActions.loadPublishedPostsSuccess,
  onMore: postActions.loadMorePublishedPostsSuccess,
  onLastPage: postActions.lastPagePublishedPosts,
  onReset: postActions.resetPublishedPosts,
}, 'posts', {orderByChild: 'published', equalTo: true});
