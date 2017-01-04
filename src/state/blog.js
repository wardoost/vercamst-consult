import { State, Hook } from 'jumpsuit'
import { FirebasePaginatedList } from '../core/firebase'

const blogState = State('blog', {
  initial: {
    posts: [],
    onLastPage: false,
    loading: true,
    error: null,
    showAlert: true
  },

  error: (state, payload) => ({
    error: payload
  }),

  loadPostsSuccess: (state, payload) => ({
    posts: payload,
    error: null,
    loading: false
  }),

  loadMorePostsSuccess: (state, payload) => ({
    posts: state.posts.concat(payload),
    error: null,
    loading: false
  }),

  lastPagePosts: (state, payload) => ({
    onLastPage: true
  }),

  dismissAlert: (state, payload) => ({
    showAlert: false
  }),

  unload: (state, payload) => ({
    posts: [],
    onLastPage: false,
    loading: true,
    error: null,
    showAlert: true
  })
})

export default blogState

export const publishedPostList = new FirebasePaginatedList({
  onReady: blogState.loadPostsSuccess,
  onMore: blogState.loadMorePostsSuccess,
  onLastPage: blogState.lastPagePosts,
}, 'posts', {pageSize: 6});


export function loadPosts() {
  publishedPostList.subscribe();
}

export function loadMorePosts() {
  publishedPostList.loadMore();
}

Hook((action, getState) => {
  switch (action.type) {
    case 'blog_unload':
      publishedPostList.unsubscribe();
      break;

    default:
      break;
  }
})
