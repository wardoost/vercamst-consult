import {FETCH_POSTS} from '../actions/posts';

const initialState = {
  fetching: false,
  fetched: false,
  posts: [],
  error: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_POSTS + "_PENDING":
        state = {...state, fetching: true};
        break;
      case FETCH_POSTS + "_REJECTED":
        state = {...state, fetching: false, error: action.payload};
        break;
      case FETCH_POSTS + "_FULFILLED":
        state = {...state, fetching: false, fetched: true, posts: action.payload};
        console.log(state);
        break;
      default:
        break;
    }
    return state;
}
