import { State } from 'jumpsuit'
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
    loading: payload ? true : false
  }),

  updateTitle: (state, payload) => ({
    title: payload
  }),

  updateBody: (state, payload) => ({
    body: payload
  }),

  createPostSuccess: (state, payload) => ({
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
    title: '',
    body: '',
    showAlert: true,
    loading: false
  })
})

export default addPostState

export function createPost(post, duplicateSlug = null) {
  let newSlug = duplicateSlug ? duplicateSlug + '-2' : slug(post.title, {lower: true});

  firebaseDb.ref('posts').once('value', snapshot => {
    if (!snapshot.hasChild(newSlug)) {
      firebaseDb.ref('posts/' + newSlug).set(post)
        .then(() => addPostState.createPostSuccess(post))
        .catch(error => addPostState.error(error));
    } else {
      createPost(post, newSlug)
    }
  })
}
