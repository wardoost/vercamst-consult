import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyAliWYXAbSVu9HHpHLHDDTmC-I1UOAq_1k",
  authDomain: "vercamst-consult.firebaseapp.com",
  databaseURL: "https://vercamst-consult.firebaseio.com",
  storageBucket: "vercamst-consult.appspot.com",
});

export const database = firebase.database();
