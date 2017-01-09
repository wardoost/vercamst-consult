import { State, Goto } from 'jumpsuit'
import { firebaseDb } from '../core/firebase'
import slug from 'slug'

const addPostState = State('addPost', {
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

export default addPostState

export function createPost (post, duplicateSlug = null) {
  addPostState.loading(true)

  firebaseDb.ref('posts').once('value', snapshot => {
    const newSlug = duplicateSlug ? duplicateSlug + '-2' : slug(post.title, {lower: true})
    
    if (!snapshot.hasChild(newSlug)) {
      firebaseDb.ref('posts/' + newSlug).set(post)
        .then(() => Goto('/management'))
        .catch(error => addPostState.error(error))
    } else {
      createPost(post, newSlug)
    }
  })
}
