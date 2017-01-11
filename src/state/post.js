import { State } from 'jumpsuit'
import { firebaseDb, firebaseMove } from '../core/firebase'
import slug from 'slug'

const initialState = {
  post: null,
  title: '',
  titleChanged: false,
  body: '',
  bodyChanged: false,
  unsavedChanges: false,
  published: false,
  error: null,
  showAlert: true,
  loading: false
}

const postState = State('post', {
  initial: initialState,

  error: (state, payload) => ({
    showAlert: true,
    error: payload,
    loading: false
  }),

  loading: (state, payload) => ({
    loading: Boolean(payload)
  }),

  loadPostSuccess: (state, payload) => ({
    post: payload.post,
    title: payload.post.title,
    body: payload.post.body,
    published: payload.published,
    error: null,
    loading: false
  }),

  publishPostSuccess: (state, payload) => ({
    published: true,
    loading: false
  }),

  depublishPostSuccess: (state, payload) => ({
    published: false,
    loading: false
  }),

  updateTitle: (state, payload) => ({
    title: payload,
    titleChanged: state.post ? payload !== state.post.title : payload !== '',
    unsavedChanges: state.post ? payload !== state.post.title : payload !== '' && state.bodyChanged
  }),

  updateBody: (state, payload) => ({
    body: payload,
    bodyChanged: true,
    unsavedChanges: state.post ? true : state.titleChanged
  }),

  dismissAlert: (state, payload) => ({
    showAlert: false
  }),

  reset: (state, payload) => initialState
})

export default postState

export function loadPost (key) {
  postState.loading(true)

  firebaseDb.ref(`posts/published/${key}`).once('value')
    .then(snapPublished => {
      const postPublished = snapPublished.val()

      if (postPublished) {
        postState.loadPostSuccess({post: postPublished, published: true})
      } else {
        firebaseDb.ref(`posts/unpublished/${key}`).once('value')
          .then(snapUnpublished => postState.loadPostSuccess({post: snapUnpublished.val(), published: false}))
          .catch(error => postState.error(error))
      }
    })
    .catch(error => postState.error(error))
}

export function addPost (post, published = false, duplicateSlug = null) {
  return new Promise((resolve, reject) => {
    postState.loading(true)

    const refPath = `posts/${published ? 'published' : 'unpublished'}/`
    firebaseDb.ref(refPath).once('value', snapshot => {
      const newSlug = duplicateSlug ? duplicateSlug + '-2' : slug(post.title || 'post', {lower: true})

      if (!snapshot.hasChild(newSlug)) {
        firebaseDb.ref(refPath + newSlug).set(post)
          .then(() => resolve(`posts/${newSlug}`))
          .catch(error => {
            postState.error(error)
            reject(error)
          })
      } else {
        addPost(post, published, newSlug)
      }
    })
  })
}

export function updatePost (key, post) {
  return new Promise((resolve, reject) => {
    postState.loading(true)

    const published = postState.getState().published
    const postRefPath = `posts/${published ? 'published' : 'unpublished'}/${key}`

    firebaseDb.ref(postRefPath).update(post)
      .then(post => resolve())
      .catch(error => {
        postState.error(error)
        reject(error)
      })
  })
}

export function publishPost (key, post) {
  return new Promise((resolve, reject) => {
    postState.loading(true)

    firebaseMove(`posts/unpublished/${key}`, `posts/published/${key}`)
      .then(() => {
        postState.publishPostSuccess()
        resolve(`/posts/${key}`)
      })
      .catch(error => {
        postState.error(error)
        reject(error)
      })
  })
}

export function depublishPost (key, post) {
  return new Promise((resolve, reject) => {
    postState.loading(true)

    firebaseMove(`posts/published/${key}`, `posts/unpublished/${key}`)
      .then(() => {
        postState.depublishPostSuccess()
        resolve(`/posts/${key}`)
      })
      .catch(error => {
        postState.error(error)
        reject(error)
      })
  })
}
