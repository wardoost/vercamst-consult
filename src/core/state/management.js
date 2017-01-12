import { State, Hook } from 'jumpsuit'
import { FirebaseList } from '../firebase'
import _ from 'lodash'

const initialState = {
  posts: {
    published: [],
    unpublished: []
  },
  loadingPublished: false,
  loadingUnpublished: false,
  error: null,
  showAlert: true
}

const managementState = State('management', {
  initial: initialState,

  error: (state, payload) => ({
    error: payload
  }),

  loadingPublished: (state, payload) => ({
    loadingPublished: Boolean(payload)
  }),

  loadingUnpublished: (state, payload) => ({
    loadingUnpublished: Boolean(payload)
  }),

  loadPublishedPostsSuccess: (state, payload) => ({
    posts: {
      published: payload,
      unpublished: state.posts.unpublished
    },
    error: null,
    loadingPublished: false
  }),

  createPublishedPostSuccess: (state, payload) => ({
    posts: {
      published: _.concat(state.posts.published, payload),
      unpublished: state.posts.unpublished
    },
    error: null
  }),

  updatePublishedPostsSuccess: (state, payload) => ({
    posts: {
      published: state.posts.published.map(post => { return post.key === payload.key ? payload : post }),
      unpublished: state.posts.unpublished
    },
    error: null
  }),

  deletePublishedPostSuccess: (state, payload) => ({
    posts: {
      published: state.posts.published.filter(post => post.key !== payload.key),
      unpublished: state.posts.unpublished
    },
    error: null
  }),

  loadUnpublishedPostsSuccess: (state, payload) => ({
    posts: {
      published: state.posts.published,
      unpublished: payload
    },
    error: null,
    loadingUnpublished: false
  }),

  createUnpublishedPostSuccess: (state, payload) => ({
    posts: {
      published: state.posts.published,
      unpublished: _.concat(state.posts.unpublished, payload)
    },
    error: null
  }),

  updateUnpublishedPostsSuccess: (state, payload) => ({
    posts: {
      published: state.posts.published,
      unpublished: state.posts.published.map(post => { return post.key === payload.key ? payload : post })
    },
    error: null
  }),

  deleteUnpublishedPostSuccess: (state, payload) => ({
    posts: {
      published: state.posts.published,
      unpublished: state.posts.unpublished.filter(post => post.key !== payload.key)
    },
    error: null
  }),

  dismissAlert: (state, payload) => ({
    showAlert: false
  }),

  reset: (state, payload) => initialState
})

export default managementState

const publishedPostList = new FirebaseList({
  onAdd: managementState.createPublishedPostSuccess,
  onLoad: managementState.loadPublishedPostsSuccess,
  onChange: managementState.updatePublishedPostsSuccess,
  onRemove: managementState.deletePublishedPostSuccess
}, 'posts/published')

const unpublishedPostList = new FirebaseList({
  onAdd: managementState.createUnpublishedPostSuccess,
  onLoad: managementState.loadUnpublishedPostsSuccess,
  onChange: managementState.updateUnpublishedPostsSuccess,
  onRemove: managementState.deleteUnpublishedPostSuccess
}, 'posts/unpublished')

export function loadAllPosts () {
  loadPublishedPosts()
    .then(() => {
      loadUnpublishedPosts()
    })
    .catch(error => managementState.error(error))
}

export function loadPublishedPosts () {
  return new Promise((resolve, reject) => {
    managementState.loadingPublished(true)
    publishedPostList.subscribe()
      .then(() => resolve())
      .catch(error => reject(error))
  })
}

export function loadUnpublishedPosts () {
  managementState.loadingUnpublished(true)
  unpublishedPostList.subscribe()
}

export function createPost (post, published) {
  return new Promise((resolve, reject) => {
    const postList = published ? publishedPostList : unpublishedPostList

    postList.set(post.key, post)
      .then(() => resolve())
      .catch(error => {
        managementState.error(error)
        reject(error)
      })
  })
}

export function updatePost (post, published) {
  return new Promise((resolve, reject) => {
    const postList = published ? publishedPostList : unpublishedPostList

    postList.update(post.key, post)
      .then(() => resolve())
      .catch(error => {
        managementState.error(error)
        reject(error)
      })
  })
}

export function deletePost (post, published) {
  return new Promise((resolve, reject) => {
    const postList = published ? publishedPostList : unpublishedPostList

    postList.remove(post.key)
      .then(() => resolve())
      .catch(error => {
        managementState.error(error)
        reject(error)
      })
  })
}

Hook((action, getState) => {
  switch (action.type) {
    case 'management_reset':
      publishedPostList.unsubscribe()
      unpublishedPostList.unsubscribe()
      break
  }
})
