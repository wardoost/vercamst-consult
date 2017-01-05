import { State } from 'jumpsuit'
import { firebaseDb } from '../core/firebase'

const postState = State('post', {
  initial: {
    post: null,
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
    error: null,
    loading: false
  }),

  dismissAlert: (state, payload) => ({
    showAlert: false
  }),

  unload: (state, payload) => ({
    post: null,
    error: null,
    showAlert: true,
    loading: false
  })
})

export default postState

export function loadPost (key) {
  postState.loading(true)

  firebaseDb.ref('posts/' + key).once('value')
    .then(snapshot => {
      postState.loadPostSuccess(snapshot.val())
      postState.loading(false)
    })
    .catch(error => postState.error(error))
}
