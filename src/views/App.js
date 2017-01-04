import React from 'react'
import { Component, Router, Route, IndexRoute, getState, Hook, Goto } from 'jumpsuit'
import ReactGA from 'react-ga';
import { authInit, isAuthenticated } from '../state/auth'
import Layout from './components/Layout'
import Loading from './components/Loading'

const requireAuth = (nextState, replace, cb) => {
  if(getState().auth.initialized && !isAuthenticated()){
    replace({pathname: '/login'})
  }
  cb();
}

const noAuth = (nextState, replace, cb) => {
  if(getState().auth.initialized && isAuthenticated()){
    replace({pathname: '/management'})
  }
  cb();
}

Hook((action, getState) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      const { pathname } = action.payload;
      window.scrollTo(0, 0)
      ReactGA.set({ page: pathname });
      ReactGA.pageview(pathname);
      break;
    case 'auth_initSuccess':
      const currentPath = getState().routing.locationBeforeTransitions.pathname;
      switch (currentPath) {
        case '/login':
          if (isAuthenticated()) {
             Goto('/management');
          } else {
            Goto(currentPath);
          }
          break;
        case '/management':
        case '/posts/add':
          if (!isAuthenticated()) {
            Goto('/login');
          } else {
            Goto(currentPath)
          }
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
})

export default Component({
  componentWillMount() {
    authInit();

    ReactGA.initialize('UA-79882435-1');
  },

  render() {
    return (
      <Router>
        <Route path="/" component={Layout}>
          <IndexRoute
            getComponent={(location, cb) => {
              require.ensure([], require => {
                  cb(null, require('./pages/Index').default)
              });
            }}
          />
          <Route
            path="/posts/add"
            onEnter={requireAuth}
            getComponent={(location, cb) => {
              if (!getState().auth.initialized) {
                cb(null, Loading)
              } else {
                require.ensure([], require => {
                    cb(null, require('./pages/AddPost').default)
                });
              }
            }}
          />
          <Route
            path="/posts/:id"
            getComponent={(location, cb) => {
              require.ensure([], require => {
                  cb(null, require('./pages/Post').default)
              });
            }}
          />
          <Route
            path="/login"
            onEnter={noAuth}
            getComponent={(location, cb) => {
              if (!getState().auth.initialized) {
                cb(null, Loading)
              } else {
                require.ensure([], require => {
                    cb(null, require('./pages/Login').default)
                });
              }
            }}
          />
          <Route
            path="/management"
            onEnter={requireAuth}
            getComponent={(location, cb) => {
              if (!getState().auth.initialized) {
                cb(null, Loading)
              } else {
                require.ensure([], require => {
                    cb(null, require('./pages/Management').default)
                });
              }
            }}
          />
          <Route
            path="/*"
            getComponent={(location, cb) => {
              require.ensure([], require => {
                  cb(null, require('./pages/Error').default)
              });
            }}
          />
        </Route>
      </Router>
    )
  }
})
