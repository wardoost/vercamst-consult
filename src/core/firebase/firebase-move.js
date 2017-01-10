import { firebaseDb } from './firebase'

export function firebaseMove (oldPath, newPath) {
  return new Promise((resolve, reject) => {
    const oldRef = firebaseDb.ref(oldPath)
    const newRef = firebaseDb.ref(newPath)

    oldRef.once('value', snap => {
      newRef.set(snap.val(), error => {
        if (!error) {
          oldRef.remove()
          resolve()
        } else if (typeof (console) !== 'undefined' && console.error) {
          reject(error)
        }
      })
    })
  })
}
