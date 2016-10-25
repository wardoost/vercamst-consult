import {firebaseAuth} from '../firebase';
import * as authActions from './actions';
import authReducer from './reducer';

export {authActions, authReducer};
export {isAuthenticated} from './selectors';

export function initAuth(dispatch) {
  return new Promise((resolve, reject) => {
    const unsub = firebaseAuth.onAuthStateChanged(
      user => {
        dispatch(authActions.authInit(user));
        unsub();
        resolve();
      },
      error => reject(error)
    );
  });
}
