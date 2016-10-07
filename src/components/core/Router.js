import React, {Component} from 'react';
import {Router as ReactRouter, Route, IndexRoute, browserHistory} from 'react-router';
import Main from '../Main';
import Index from '../pages/Index';
import Posts from '../pages/Posts';
import Error from '../pages/Error';

export default class Router extends Component {
  render() {
    return (
      <ReactRouter history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
        <Route path="/" component={Main}>
          <IndexRoute component={Index}/>
          <Route path="posts" component={Posts}/>
        </Route>
        <Route path="*" component={Main}>
          <IndexRoute component={Error}/>
        </Route>
      </ReactRouter>
    )
  }
}
