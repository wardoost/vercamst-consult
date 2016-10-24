import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAliWYXAbSVu9HHpHLHDDTmC-I1UOAq_1k',
  authDomain: 'vercamst-consult.firebaseapp.com',
  databaseURL: 'https://vercamst-consult.firebaseio.com',
  storageBucket: 'vercamst-consult.appspot.com',
}

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebase.auth();
export const firebaseDb = firebase.database();
