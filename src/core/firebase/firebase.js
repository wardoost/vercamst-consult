import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)
export const firebaseAuth = firebase.auth()
export const firebaseDb = firebase.database()
