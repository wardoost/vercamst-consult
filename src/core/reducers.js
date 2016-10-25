import {combineReducers} from 'redux';
import {authReducer} from './auth';
import {blogReducer} from './blog';
import {postReducer} from './post';
import {managementReducer} from './management';

export default combineReducers({
  auth: authReducer,
  blog: blogReducer,
  post: postReducer,
  management: managementReducer,
})
