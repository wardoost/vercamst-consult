import { State, Hook } from 'jumpsuit'
import { FirebaseList } from '../core/firebase'

const managementState = State('management', {
  initial: {
    posts: [],
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

  createPostSuccess: (state, payload) => ({
    posts: state.posts.map(post => {
      return post.key === payload.key ? payload : post;
    }),
    error: null
  }),

  updatePostSuccess: (state, payload) => ({
    posts: state.posts.map(post => {
      return post.key === payload.key ? payload : post;
    }),
    error: null
  }),

  deletePostSuccess: (state, payload) => ({
    posts: state.posts.filter(post => post.key !== payload.key),
    error: null
  }),

  dismissAlert: (state, payload) => ({
    showAlert: false
  }),

  unload: (state, payload) => ({
    posts: [],
    loading: true,
    error: null,
    showAlert: true
  })
})

export default managementState

const postList = new FirebaseList({
  onAdd: managementState.createPostSuccess,
  onLoad: managementState.loadPostsSuccess,
  onChange: managementState.updatePostSuccess,
  onRemove: managementState.deletePostSuccess
}, 'posts');

export function loadPosts() {
  postList.subscribe();
}

export function createPost(post) {
  postList.push(post)
    .catch(error => managementState.error(error));
}

export function deletePost(post) {
  postList.remove(post.key)
    .catch(error => managementState.error(error));
}

export function updatePost(post, changes) {
  postList.update(post.key, changes)
    .catch(error => managementState.error(error));
}

Hook((action, getState) => {
  switch (action.type) {
    case 'management_unload':
      postList.unsubscribe();
      break;

    default:
      break;
  }
})
