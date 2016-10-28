import { firebaseDb } from './firebase';

const defaultOptions = {
  pageSize: 6
}

export class FirebasePaginatedList {
  constructor(actions, path = null, options) {
    this._actions = actions;
    this._path = path;
    this._ref = firebaseDb.ref(this._path);
    this._options = {...defaultOptions, ...options};
    this._initialized = false;
  }

  get path() {
    return this._path;
  }

  set path(value) {
    this._path = value;
    this._ref = firebaseDb.ref(this._path).orderByKey();
  }

  setPage(cursor) {
    const {pageSize} = this._options;
    const paginator = this;
    let ref = this._ref.orderByKey();

    // Limit result
    ref = ref.limitToLast(pageSize + 1);
    if (cursor) {
      ref = ref.endAt(cursor);
    }

    return ref.once('value')
      .then(snap => {
        let list = [];
        let cursor = undefined;

        snap.forEach(childSnap => {
          if (!cursor) {
            cursor = childSnap.key;
          }
          list.push(this.unwrapSnapshot(childSnap));
        });

        if (list.length === pageSize + 1) {
          list.shift();
        } else {
          paginator._emit(paginator._actions.onLastPage());
        }

        paginator.isLastPage = true;
        paginator.list = list.reverse();
        paginator.cursor = cursor;
      })
      .then(() => {
        if(!paginator._initialized) {
          paginator._initialized = true;
          paginator._emit(paginator._actions.onReady(paginator.list));
        }
      });
  }

  reset(emit) {
    const paginator = this;

    return this.setPage()
      .then(() => {
        emit(this._actions.onReset(paginator.list));
      })
  }

  loadMore(emit) {
    const paginator = this;

    return this.setPage(this.cursor)
      .then(() => {
        emit(this._actions.onMore(paginator.list));
      });
  }

  subscribe(emit) {
    this._emit = emit;
    this.setPage()
    this._unsubscribe = () => this._ref.off();
  }

  unsubscribe() {
    this._unsubscribe();
  }

  unwrapSnapshot(snap) {
    let unwrappedSnap = snap.val();
    unwrappedSnap.key = snap.key;
    return unwrappedSnap;
  }
}
