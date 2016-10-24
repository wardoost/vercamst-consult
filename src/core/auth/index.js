import {firebaseAuth} from '../firebase';
import * as authActions from './actions';

export {authActions};
export {authReducer} from './reducer';
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
