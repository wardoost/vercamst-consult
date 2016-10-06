import React, {Component} from 'react';
import {Router as ReactRouter, Route, IndexRoute, browserHistory} from 'react-router';
import Layout from '../Layout';
import Index from '../pages/Index';
import Post from '../pages/Post';
import Error from '../pages/Error';

export default class Router extends Component {
  render() {
    return (
      <ReactRouter history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Index}/>
          <Route path="posts" component={Post}/>
        </Route>
        <Route path="*" component={Layout}>
          <IndexRoute component={Error}/>
        </Route>
      </ReactRouter>
    )
  }
}