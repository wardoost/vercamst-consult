import C from '../../constants';

const initialState = {
  posts: null,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case C.FETCH_POSTS_ERROR:
      return {...state, posts: null, error: action.payload};
    case C.FETCH_POSTS_SUCCESS:
      return {...state, posts: action.payload, error: null};
    default:
      return state;
  }
}
