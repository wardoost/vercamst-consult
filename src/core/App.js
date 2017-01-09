import { Component, Router, Route, IndexRoute, getState, Hook, Goto } from 'jumpsuit'
import ReactGA from 'react-ga'
import { authInit, isAuthenticated } from '../state/auth'
import Layout from '../components/Layout'
import Loading from '../components/Loading'

export default Component({
  componentWillMount () {
    authInit()
      .then(user => {
        const path = document.location.pathname

        if (path === '/login') {
          Goto(isAuthenticated() ? '/management' : path)
        } else if (isRequireAuthPath(path)) {
          Goto(!isAuthenticated() ? '/login' : path)
        }
      })
      .catch(error => console.log(error))

    if (process.env.NODE_ENV === 'production') ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_ID)
  },

  requireAuth (nextState, replace, cb) {
    if (getState().auth.initialized && !isAuthenticated()) {
      replace({pathname: '/login'})
    }
    cb()
  },

  noAuth (nextState, replace, cb) {
    if (getState().auth.initialized && isAuthenticated()) {
      replace({pathname: '/management'})
    }
    cb()
  },

  render () {
    return (
      <Router>
        <Route path='/' component={Layout}>
          <IndexRoute
            getComponent={(loc, cb) => require.ensure([], require => cb(null, require('../pages/Index').default))}
          />
          <Route
            path='/posts/add'
            onEnter={this.requireAuth}
            getComponent={(loc, cb) => !getState().auth.initialized ? cb(null, Loading) : require.ensure([], require => cb(null, require('../pages/AddPost').default))}
          />
          <Route
            path='/posts/:id'
            getComponent={(loc, cb) => require.ensure([], require => cb(null, require('../pages/Post').default))}
          />
          <Route
            path='/posts/:id/edit'
            onEnter={this.requireAuth}
            getComponent={(loc, cb) => !getState().auth.initialized ? cb(null, Loading) : require.ensure([], require => cb(null, require('../pages/EditPost').default))}
          />
          <Route
            path='/login'
            onEnter={this.noAuth}
            getComponent={(loc, cb) => !getState().auth.initialized ? cb(null, Loading) : require.ensure([], require => cb(null, require('../pages/Login').default))}
          />
          <Route
            path='/management'
            onEnter={this.requireAuth}
            getComponent={(loc, cb) => !getState().auth.initialized ? cb(null, Loading) : require.ensure([], require => cb(null, require('../pages/Management').default))}
          />
          <Route
            path='/*'
            getComponent={(loc, cb) => require.ensure([], require => cb(null, require('../pages/Error').default))}
          />
        </Route>
      </Router>
    )
  }
})

Hook((action, getState) => {
  const { type, payload } = action

  switch (type) {
    case '@@router/LOCATION_CHANGE':
      if (payload.action !== 'REPLACE') window.scrollTo(0, 0)

      if (process.env.NODE_ENV === 'production') {
        ReactGA.set({ page: payload.pathname })
        ReactGA.pageview(payload.pathname)
      }
      break
  }
})

export function isRequireAuthPath (path) {
  return /(\/management|\/posts\/add|^\/posts\/.*\/edit)$/.test(path)
}
