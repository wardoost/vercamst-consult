import { State, Hook } from 'jumpsuit'
import { FirebasePaginatedList } from '../firebase'

const initialState = {
  posts: [],
  onLastPage: false,
  loading: true,
  error: null,
  showAlert: true
}

const blogState = State('blog', {
  initial: initialState,

  error: (state, payload) => ({
    error: payload
  }),

  loading: (state, payload) => ({
    loading: Boolean(payload)
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

  reset: (state, payload) => initialState
})

export default blogState

export const publishedPostList = new FirebasePaginatedList({
  onReady: blogState.loadPostsSuccess,
  onMore: blogState.loadMorePostsSuccess,
  onLastPage: blogState.lastPagePosts
}, 'posts/published', {pageSize: 6})

export function loadPosts () {
  blogState.loading(true)
  publishedPostList.subscribe()
}

export function loadMorePosts () {
  blogState.loading(true)
  publishedPostList.loadMore()
}

Hook((action, getState) => {
  switch (action.type) {
    case 'blog_reset':
      publishedPostList.unsubscribe()
      break
  }
})
