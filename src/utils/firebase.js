import C from '../constants';
import * as firebase from 'firebase';

firebase.initializeApp(C.firebaseConfig);

export const database = firebase.database();
