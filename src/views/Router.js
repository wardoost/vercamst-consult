import React, {Component} from 'react';
import {Router as ReactRouter, Route, IndexRoute, browserHistory} from 'react-router';
import store from '../core/store';
import Layout from './components/Layout';
import Index from './pages/Index';
import Posts from './pages/Posts';
import Post from './pages/Post';
import Login from './pages/Login';
import PostsList from './pages/PostsList';
import Error from './pages/Error';

const requireAuth = (nextState, replace, cb) => {
  const {auth: {uid}} = store.getState();
  if(!uid){
    replace({pathname: '/login'});
  }
  cb();
}

const noAuth = (nextState, replace, cb) => {
  const {auth: {uid}} = store.getState();
  if(uid){
    replace({pathname: '/'});
  }
  cb();
}

export default class Router extends Component {
  render() {
    return (
      <ReactRouter history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Index}/>
          <Route path="posts" component={Posts}/>
          <Route path="posts/:id" component={Post}/>
          <Route path="login" component={Login} onEnter={noAuth}/>
          <Route path="posts-list" component={PostsList} onEnter={requireAuth}/>
        </Route>
        <Route path="*" component={Layout}>
          <IndexRoute component={Error}/>
        </Route>
      </ReactRouter>
    )
  }
}
