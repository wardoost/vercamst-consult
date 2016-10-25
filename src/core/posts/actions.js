import slug from 'slug';
import {firebaseDb} from '../firebase';
import {postsList} from './posts-list';
import {publishedPostsList} from './published-posts-list';
import {
  LOAD_POST_ERROR,
  LOAD_POST_SUCCESS,
  CREATE_POST_ERROR,
  CREATE_POST_SUCCESS,
  UPDATE_POST_ERROR,
  UPDATE_POST_SUCCESS,
  DELETE_POST_ERROR,
  DELETE_POST_SUCCESS,
  LOAD_POSTS_SUCCESS,
  UNLOAD_POSTS_SUCCESS,
  LOAD_PUBLISHED_POSTS_SUCCESS,
  UNLOAD_PUBLISHED_POSTS_SUCCESS,
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

export function createPostSuccess(post) {
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

function deletePostError(error) {
  return {
    type: DELETE_POST_ERROR,
    payload: error
  };
}

export function deletePostSuccess(post) {
  return {
    type: DELETE_POST_SUCCESS,
    payload: post
  };
}

export function deletePost(post) {
  return dispatch => {
    postsList.remove(post.key)
      .catch(error => dispatch(deletePostError(error)));
  };
}

export function updatePostError(error) {
  return {
    type: UPDATE_POST_ERROR,
    payload: error
  };
}

export function updatePostSuccess(post) {
  return {
    type: UPDATE_POST_SUCCESS,
    payload: post
  };
}

export function updatePost(post, changes) {
  return dispatch => {
    postsList.update(post.key, changes)
      .catch(error => dispatch(updatePostError(error)));
  };
}

export function loadPostsSuccess(result) {
  return {
    type: LOAD_POSTS_SUCCESS,
    payload: result
  };
}

export function loadPosts() {
  return dispatch => {
    postsList.subscribe(dispatch);
  };
}

export function unloadPosts() {
  postsList.unsubscribe();
  return {
    type: UNLOAD_POSTS_SUCCESS
  };
}

export function loadPublishedPostsSuccess(result) {
  return {
    type: LOAD_PUBLISHED_POSTS_SUCCESS,
    payload: result
  };
}

export function loadPublishedPosts() {
  return dispatch => {
    publishedPostsList.filter = {
      attribute: "published",
      value: true
    }
    publishedPostsList.subscribe(dispatch);
  };
}

export function unloadPublishedPosts() {
  publishedPostsList.unsubscribe();
  return {
    type: UNLOAD_PUBLISHED_POSTS_SUCCESS
  };
}
