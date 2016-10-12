import C from '../../constants';

const initialState = {
  posts: [],
  fetching: false,
  fetched: false,
  error: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case C.FETCH_POSTS_PENDING:
      state = {...state, fetching: true};
      break;
    case C.FETCH_POSTS_REJECTED:
      state = {...state, fetching: false, error: action.payload};
      break;
    case C.FETCH_POSTS_FULFILLED:
      state = {...state, fetching: false, fetched: true, posts: action.payload};
      break;
    default:
      break;
  }
  return state;
}
