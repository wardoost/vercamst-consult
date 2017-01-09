
import { Component, Router, Route, IndexRoute, getState, Hook, Goto } from 'jumpsuit'
import ReactGA from 'react-ga'
import { authInit, isAuthenticated } from '../state/auth'
import Layout from '../components/Layout'
import Loading from '../components/Loading'

const requireAuth = (nextState, replace, cb) => {
  if (getState().auth.initialized && !isAuthenticated()) {
    replace({pathname: '/login'})
  }
  cb()
}

const noAuth = (nextState, replace, cb) => {
  if (getState().auth.initialized && isAuthenticated()) {
    replace({pathname: '/management'})
  }
  cb()
}

Hook((action, getState) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      const { pathname } = action.payload
      window.scrollTo(0, 0)
      if (process.env.NODE_ENV === 'production') {
        ReactGA.set({ page: pathname })
        ReactGA.pageview(pathname)
      }
      break
    case 'auth_initSuccess':
      const currentPath = getState().routing.locationBeforeTransitions.pathname

      if (currentPath === '/login') {
        Goto(isAuthenticated() ? '/management' : currentPath)
      } else if (currentPath === '/management' ||
        currentPath === '/posts/add' ||
        /^\/posts\/.*\/edit$/.test(currentPath)) {
        Goto(!isAuthenticated() ? '/login' : currentPath)
      }
      break
  }
})

export default Component({
  componentWillMount () {
    authInit()

    if (process.env.NODE_ENV === 'production') ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_ID)
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
            onEnter={requireAuth}
            getComponent={(loc, cb) => !getState().auth.initialized ? cb(null, Loading) : require.ensure([], require => cb(null, require('../pages/AddPost').default))}
          />
          <Route
            path='/posts/:id'
            getComponent={(loc, cb) => require.ensure([], require => cb(null, require('../pages/Post').default))}
          />
          <Route
            path='/posts/:id/edit'
            onEnter={requireAuth}
            getComponent={(loc, cb) => !getState().auth.initialized ? cb(null, Loading) : require.ensure([], require => cb(null, require('../pages/EditPost').default))}
          />
          <Route
            path='/login'
            onEnter={noAuth}
            getComponent={(loc, cb) => !getState().auth.initialized ? cb(null, Loading) : require.ensure([], require => cb(null, require('../pages/Login').default))}
          />
          <Route
            path='/management'
            onEnter={requireAuth}
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
