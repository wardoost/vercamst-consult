import { State, Effect, Goto } from 'jumpsuit'
import { authLogin } from './auth'

const loginState = State('login', {
  initial: {
    email: '',
    password: '',
    error: null,
    showAlert: true,
    loading: false
  },

  error: (state, payload) => ({
    password: '',
    showAlert: true,
    error: payload,
    loading: false
  }),

  loading: (state, payload) => ({
    loading: payload ? true : false
  }),

  updateEmail: (state, payload) => ({
    email: payload
  }),

  updatePassword: (state, payload) => ({
    password: payload
  }),

  unload: (state, payload) => ({
    email: '',
    password: '',
    error: null,
    showAlert: true,
    loading: false
  }),

  dismissAlert: (state, payload) => ({
    showAlert: false
  })
})

Effect('submitLogin', (payload) => {
  loginState.loading(true)
  authLogin(payload.email, payload.password)
    .then(() => {
      Goto('/management');
      loginState.unload()
    })
    .catch(error => loginState.error(error))
    .then(() => {
      loginState.loading(false)
    })
})

export default loginState
