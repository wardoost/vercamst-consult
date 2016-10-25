export class FirebaseList {
  constructor(actions, ref) {
    this._actions = actions;
    this._ref = ref;
  }

  get ref() {
    return this._ref;
  }

  set ref(value) {
    this._ref = value;
  }

  push(value) {
    return new Promise((resolve, reject) => {
      this._ref.push(value, error => error ? reject(error) : resolve());
    });
  }

  remove(key) {
    return new Promise((resolve, reject) => {
      this._ref.child(key)
        .remove(error => error ? reject(error) : resolve());
    });
  }

  set(key, value) {
    return new Promise((resolve, reject) => {
      this._ref.child(key)
        .set(value, error => error ? reject(error) : resolve());
    });
  }

  update(key, value) {
    return new Promise((resolve, reject) => {
      this._ref.child(key)
        .update(value, error => error ? reject(error) : resolve());
    });
  }

  subscribe(emit) {
    let initialized = false;
    let list = [];

    this._ref.once('value', () => {
      initialized = true;
      emit(this._actions.onLoad(list));
    });

    this._ref.on('child_added', snapshot => {
      if (initialized) {
        emit(this._actions.onAdd(this.unwrapSnapshot(snapshot)));
      }
      else {
        list.push(this.unwrapSnapshot(snapshot));
      }
    });

    this._ref.on('child_changed', snapshot => {
      emit(this._actions.onChange(this.unwrapSnapshot(snapshot)));
    });

    this._ref.on('child_removed', snapshot => {
      emit(this._actions.onRemove(this.unwrapSnapshot(snapshot)));
    });

    this._unsubscribe = () => this._ref.off();
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
