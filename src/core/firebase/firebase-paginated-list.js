import { firebaseDb } from './firebase';

const defaultOptions = {
  pageSize: 12
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
    this._ref = firebaseDb.ref(this._path);
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
          paginator._actions.onLastPage();
        }

        paginator.isLastPage = true;
        paginator.list = list.reverse();
        paginator.cursor = cursor;
      })
      .then(() => {
        if(!paginator._initialized) {
          paginator._initialized = true;
          paginator._actions.onReady(paginator.list);
        }
      });
  }

  reset() {
    const paginator = this;

    return this.setPage()
      .then(() => {
        this._actions.onReset(paginator.list);
      })
  }

  loadMore() {
    const paginator = this;

    return this.setPage(this.cursor)
      .then(() => {
        this._actions.onMore(paginator.list);
      });
  }

  subscribe() {
    this.setPage()
    this._unsubscribe = () => this._ref.off();
  }

  unsubscribe() {
    this._initialized = false;
    this._unsubscribe();
  }

  unwrapSnapshot(snap) {
    let unwrappedSnap = snap.val();
    unwrappedSnap.key = snap.key;
    return unwrappedSnap;
  }
}
