import { State } from 'jumpsuit'
import slugify from 'slugify'
import { firebaseDb, firebaseMove } from '../firebase'

const initialState = {
  post: null,
  title: '',
  titleChanged: false,
  body: '',
  bodyChanged: false,
  editorState: null,
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

  initEditor: (state, payload) => ({
    editorState: payload
  }),

  loadPostSuccess: (state, payload) => ({
    post: payload.post,
    title: payload.post.title,
    body: payload.post.body,
    published: payload.published,
    error: null,
    loading: false
  }),

  updatePostSuccess: (state, payload) => ({
    post: payload,
    title: payload.title,
    titleChanged: false,
    body: payload.body,
    bodyChanged: false,
    unsavedChanges: false,
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

  updateEditor: (state, payload) => ({
    editorState: payload,
    bodyChanged: true,
    unsavedChanges: state.post ? true : state.titleChanged
  }),

  updateBody: (state, payload) => ({
    body: payload
  }),

  dismissAlert: (state, payload) => ({
    showAlert: false
  }),

  reset: (state, payload) => initialState
})

export default postState

export function loadPost (key) {
  postState.loading(true)

  firebaseDb.ref(`posts/published/${key}`).once('value', snap => {
    const post = snap.val()
    post
    ? postState.loadPostSuccess({post: post, published: true})
    : firebaseDb.ref(`posts/unpublished/${key}`).once('value', snap => {
      const post = snap.val()
      post
      ? postState.loadPostSuccess({post: post, published: false})
      : postState.error({message: 'Could not find post.'})
    })
  })
}

export function addPost (post, published = false, duplicateSlug = null) {
  return new Promise((resolve, reject) => {
    postState.loading(true)

    const refPath = `posts/${published ? 'published' : 'unpublished'}/`
    firebaseDb.ref(refPath).once('value', snapshot => {
      const newSlug = duplicateSlug ? duplicateSlug + '-2' : slugify(post.title || 'post').replace(/[^a-zA-Z0-9-]/g, '')

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

export function updatePost (key, post, published) {
  return new Promise((resolve, reject) => {
    postState.loading(true)

    const postRefPath = `posts/${published ? 'published' : 'unpublished'}/${key}`

    firebaseDb.ref(postRefPath).update(post)
      .then(() => {
        postState.updatePostSuccess(post)
        resolve()
      })
      .catch(error => {
        postState.error(error)
        reject(error)
      })
  })
}

export function removePost (key, published) {
  return new Promise((resolve, reject) => {
    postState.loading(true)

    const postRefPath = `posts/${published ? 'published' : 'unpublished'}/${key}`

    firebaseDb.ref(postRefPath).remove(error => {
      if (error) {
        postState.error(error)
        reject(error)
      } else {
        postState.loading(false)
        resolve()
      }
    })
  })
}

export function publishPost (key, post, updatePostState = true) {
  return new Promise((resolve, reject) => {
    if (updatePostState) postState.loading(true)

    firebaseMove(`posts/unpublished/${key}`, `posts/published/${key}`)
      .then(() => {
        if (updatePostState) postState.publishPostSuccess()
        resolve()
      })
      .catch(error => {
        if (updatePostState) postState.error(error)
        reject(error)
      })
  })
}

export function depublishPost (key, post, updatePostState = true) {
  return new Promise((resolve, reject) => {
    if (updatePostState) postState.loading(true)

    firebaseMove(`posts/published/${key}`, `posts/unpublished/${key}`)
      .then(() => {
        if (updatePostState) postState.depublishPostSuccess()
        resolve()
      })
      .catch(error => {
        if (updatePostState) postState.error(error)
        reject(error)
      })
  })
}
