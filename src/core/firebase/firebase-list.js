import {firebaseDb} from './firebase';

export class FirebaseList {
  constructor(actions, path = null, filter = null) {
    this._actions = actions;
    this._path = path;
    this._filter = filter;
  }

  get path() {
    return this._path;
  }

  set path(value) {
    this._path = value;
  }

  get filter() {
    return this._filter;
  }

  set filter(value) {
    this._filter = value;
  }

  push(value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(this._path)
        .push(value, error => error ? reject(error) : resolve());
    });
  }

  remove(key) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`)
        .remove(error => error ? reject(error) : resolve());
    });
  }

  set(key, value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`)
        .set(value, error => error ? reject(error) : resolve());
    });
  }

  update(key, value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`)
        .update(value, error => error ? reject(error) : resolve());
    });
  }

  subscribe() {
    let ref = firebaseDb.ref(this._path);
    let initialized = false;
    let list = [];

    if (this._filter) {
      const {orderByChild, equalTo} = this._filter;
      ref = ref.orderByChild(orderByChild).equalTo(equalTo);
    }

    ref.once('value', () => {
      initialized = true;
      this._actions.onLoad(list);
    });

    ref.on('child_added', snapshot => {
      if (initialized) {
        this._actions.onAdd(this.unwrapSnapshot(snapshot));
      }
      else {
        list.push(this.unwrapSnapshot(snapshot));
      }
    });

    ref.on('child_changed', snapshot => {
      this._actions.onChange(this.unwrapSnapshot(snapshot));
    });

    ref.on('child_removed', snapshot => {
      this._actions.onRemove(this.unwrapSnapshot(snapshot));
    });

    this._unsubscribe = () => ref.off();
  }

  unsubscribe() {
    this._unsubscribe();
  }

  unwrapSnapshot(snapshot) {
    let item = snapshot.val();
    item.key = snapshot.key;
    return item;
  }
}
