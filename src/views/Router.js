import React, {Component} from 'react';
import {Router as ReactRouter, Route, IndexRoute, browserHistory} from 'react-router';
import {isAuthenticated} from '../core/auth/selectors';
import Layout from './components/Layout';
import Index from './pages/Index';
import Post from './pages/Post';
import AddPost from './pages/AddPost';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Management from './pages/Management';
import Error from './pages/Error';

const requireAuth = (nextState, replace, cb) => {
  if(!isAuthenticated()){
    replace({pathname: '/login'});
  }
  cb();
}

const noAuth = (nextState, replace, cb) => {
  if(isAuthenticated()){
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
          <Route path="/posts/add" component={AddPost}/>
          <Route path="/posts/:id" component={Post}/>
          <Route path="/login" component={Login} onEnter={noAuth}/>
          <Route path="/logout" component={Logout} onEnter={requireAuth}/>
          <Route path="/management" component={Management} onEnter={requireAuth}/>
        </Route>
        <Route path="*" component={Layout}>
          <IndexRoute component={Error}/>
        </Route>
      </ReactRouter>
    )
  }
}