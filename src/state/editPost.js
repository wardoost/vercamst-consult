import { State, Goto } from 'jumpsuit'
import { firebaseDb } from '../core/firebase'

const editPostState = State('editPost', {
  initial: {
    post: null,
    title: '',
    body: '',
    error: null,
    showAlert: true,
    loading: false
  },

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

  unload: (state, payload) => ({
    post: null,
    title: '',
    body: '',
    error: null,
    showAlert: true,
    loading: false
  })
})

export default editPostState

export function loadPost (key) {
  editPostState.loading(true)

  firebaseDb.ref('posts/' + key).once('value')
    .then(snapshot => editPostState.loadPostSuccess(snapshot.val()))
    .catch(error => editPostState.error(error))
}

export function savePost (key, post) {
  editPostState.loading(true)

  firebaseDb.ref('posts/' + key).update(post)
    .then(post => Goto('/management'))
    .catch(error => editPostState.error(error))
}
