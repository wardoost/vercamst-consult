import {FETCH_POST} from '../actions/post';

const initialState = {
  post: {},
  fetching: false,
  fetched: false,
  error: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POST + "_PENDING":
      state = {...state, fetching: true};
      break;
    case FETCH_POST + "_REJECTED":
      state = {...state, fetching: false, error: action.payload};
      break;
    case FETCH_POST + "_FULFILLED":
      state = {...state, fetching: false, fetched: true, post: action.payload};
      break;
    default:
      break;
  }
  return state;
}
