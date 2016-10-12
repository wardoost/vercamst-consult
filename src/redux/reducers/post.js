import C from '../../constants';

const initialState = {
  post: {},
  fetching: false,
  fetched: false,
  error: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case C.FETCH_POST_PENDING:
      state = {...state, fetching: true};
      break;
    case C.FETCH_POST_REJECTED:
      state = {...state, fetching: false, error: action.payload};
      break;
    case C.FETCH_POST_FULFILLED:
      state = {...state, fetching: false, fetched: true, post: action.payload};
      break;
    default:
      break;
  }
  return state;
}
