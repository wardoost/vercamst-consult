import store from '../store';

export function isAuthenticated() {
  return store.getState().auth.uid ? true : false;
}
