import { State, Goto } from 'jumpsuit'
import { firebaseDb } from '../core/firebase'
import slug from 'slug'

const initialState = {
  post: null,
  title: '',
  body: '',
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
    post: payload,
    title: payload.title,
    body: payload.body,
    error: null,
    loading: false
  }),

  updateTitle: (state, payload) => ({
    title: payload
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

  firebaseDb.ref('posts/' + key).once('value')
    .then(snapshot => postState.loadPostSuccess(snapshot.val()))
    .catch(error => postState.error(error))
}

export function createPost (post, duplicateSlug = null) {
  postState.loading(true)

  firebaseDb.ref('posts').once('value', snapshot => {
    const newSlug = duplicateSlug ? duplicateSlug + '-2' : slug(post.title, {lower: true})

    if (!snapshot.hasChild(newSlug)) {
      firebaseDb.ref('posts/' + newSlug).set(post)
        .then(() => Goto('/management'))
        .catch(error => postState.error(error))
    } else {
      createPost(post, newSlug)
    }
  })
}

export function savePost (key, post) {
  postState.loading(true)

  firebaseDb.ref('posts/' + key).update(post)
    .then(post => Goto('/management'))
    .catch(error => postState.error(error))
}
