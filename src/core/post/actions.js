import slug from 'slug';
import {firebaseDb} from '../firebase';
import {
  LOAD_POST_ERROR,
  LOAD_POST_SUCCESS,
  CREATE_POST_ERROR,
  CREATE_POST_SUCCESS,
  UNLOAD_POST_SUCCESS,
} from './action-types';

function loadPostError(error) {
  return {
    type: LOAD_POST_ERROR,
    payload: error
  };
}

function loadPostSuccess(post) {
  return {
    type: LOAD_POST_SUCCESS,
    payload: post
  };
}

export function loadPost(key) {
  return dispatch => {
    firebaseDb.ref('posts/' + key).once('value')
      .then(snapshot => dispatch(loadPostSuccess(snapshot.val())))
      .catch(error => dispatch(loadPostError(error)));
  };
}

function createPostError(error) {
  return {
    type: CREATE_POST_ERROR,
    payload: error
  };
}

function createPostSuccess(post) {
  return {
    type: CREATE_POST_SUCCESS,
    payload: post
  };
}

export function createPost(post, duplicateSlug = null) {
  return dispatch => {
    let newSlug = duplicateSlug ? duplicateSlug + '-2' : slug(post.title, {lower: true});

    firebaseDb.ref('posts').once('value', snapshot => {
      if (!snapshot.hasChild(newSlug)) {
        firebaseDb.ref('posts/' + newSlug).set(post)
          .then(() => dispatch(createPostSuccess(post)))
          .catch(error => dispatch(createPostError(error)));
      } else {
        dispatch(createPost(post, newSlug))
      }
    })
  };
}

export function unloadPost() {
  return {
    type: UNLOAD_POST_SUCCESS
  };
}
