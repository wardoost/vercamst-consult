import { State, Goto } from 'jumpsuit'
import { firebaseAuth } from '../firebase'

const authState = State('auth', {
  initial: {
    initialized: false,
    uid: null,
    error: null
  },

  initSuccess: (state, payload) => ({
    initialized: true,
    uid: payload ? payload.uid : null
  }),

  error: (state, payload) => ({
    error: payload
  }),

  loginSuccess: (state, payload) => ({
    uid: payload.uid,
    error: null
  }),

  logoutSuccess: (state, payload) => ({
    uid: null,
    error: null
  })
})

export default authState

export function authInit () {
  return new Promise((resolve, reject) => {
    const unsub = firebaseAuth.onAuthStateChanged(
      user => {
        authState.initSuccess(user)
        unsub()
        resolve(user)
      },
      error => {
        authState.error(error)
        reject(error)
      }
    )
  })
}

export function authLogin (email, password) {
  return new Promise((resolve, reject) => {
    firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
        authState.loginSuccess(user)
        resolve(user)
      })
      .catch(error => reject(error))
  })
}

export function authLogout () {
  return new Promise((resolve, reject) => {
    firebaseAuth.signOut()
      .then(() => {
        authState.logoutSuccess()
        Goto('/')
        resolve()
      })
      .catch(error => {
        authState.error(error)
        reject(error)
      })
  })
}

export function isInitialized () {
  return authState.getState().initialized
}

export function isAuthenticated () {
  return Boolean(authState.getState().uid)
}
