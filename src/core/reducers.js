import {combineReducers} from 'redux';
import auth from './auth/reducer';
import posts from './posts/reducer';
import post from './post/reducer';

export default combineReducers({
  auth,
  posts,
  post
})
