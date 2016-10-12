import C from '../../constants';

const initialState = {
  post: null,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case C.FETCH_POST_ERROR:
      return {...state, post: null, error: action.payload};
    case C.FETCH_POST_SUCCESS:
      return {...state, post: action.payload, error: null};
    default:
      return state;
  }
}
