import { Component, Router, Route, IndexRoute, Hook, Goto } from 'jumpsuit'
import ReactGA from 'react-ga'
import { authInit, isInitialized, isAuthenticated } from './state/auth'
import { chunkLoaded, lazyLoadChunk } from './state/chunks'
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
    if (isInitialized() && !isAuthenticated()) {
      replace({pathname: '/login'})
    }
    cb()
  },

  noAuth (nextState, replace, cb) {
    if (isInitialized() && isAuthenticated()) {
      replace({pathname: '/management'})
    }
    cb()
  },

  render () {
    return (
      <Router>
        <Route path='/' component={Layout}>
          <IndexRoute
            getComponent={(loc, cb) => {
              lazyLoadChunk('Index', loc)
                .then((chunkName, markAsLoaded) => {
                  require.ensure([], require => {
                    if (!markAsLoaded) chunkLoaded(chunkName)
                    cb(null, require('../pages/Index').default)
                  })
                })
                .catch(() => cb(null, Loading))
            }}
          />
          <Route
            path='/posts/add'
            onEnter={this.requireAuth}
            getComponent={(loc, cb) => {
              lazyLoadChunk('AddPost', loc, true)
                .then((chunkName, markAsLoaded) => {
                  require.ensure([], require => {
                    if (!markAsLoaded) chunkLoaded(chunkName)
                    cb(null, require('../pages/AddPost').default)
                  })
                })
                .catch(() => cb(null, Loading))
            }}
          />
          <Route
            path='/posts/:key'
            getComponent={(loc, cb) => {
              lazyLoadChunk('Post', loc)
                .then((chunkName, markAsLoaded) => {
                  require.ensure([], require => {
                    if (!markAsLoaded) chunkLoaded(chunkName)
                    cb(null, require('../pages/Post').default)
                  })
                })
                .catch(() => cb(null, Loading))
            }}
          />
          <Route
            path='/posts/:key/edit'
            onEnter={this.requireAuth}
            getComponent={(loc, cb) => {
              lazyLoadChunk('EditPost', loc, true)
                .then((chunkName, markAsLoaded) => {
                  require.ensure([], require => {
                    if (!markAsLoaded) chunkLoaded(chunkName)
                    cb(null, require('../pages/EditPost').default)
                  })
                })
                .catch(() => cb(null, Loading))
            }}
          />
          <Route
            path='/login'
            onEnter={this.noAuth}
            getComponent={(loc, cb) => {
              lazyLoadChunk('Login', loc, true)
                .then((chunkName, markAsLoaded) => {
                  require.ensure([], require => {
                    if (!markAsLoaded) chunkLoaded(chunkName)
                    cb(null, require('../pages/Login').default)
                  })
                })
                .catch(() => cb(null, Loading))
            }}
          />
          <Route
            path='/management'
            onEnter={this.requireAuth}
            getComponent={(loc, cb) => {
              lazyLoadChunk('Management', loc, true)
                .then((chunkName, markAsLoaded) => {
                  require.ensure([], require => {
                    if (!markAsLoaded) chunkLoaded(chunkName)
                    cb(null, require('../pages/Management').default)
                  })
                })
                .catch(() => cb(null, Loading))
            }}
          />
          <Route
            path='/*'
            getComponent={(loc, cb) => {
              lazyLoadChunk('Error', loc)
                .then((chunkName, markAsLoaded) => {
                  require.ensure([], require => {
                    if (!markAsLoaded) chunkLoaded(chunkName)
                    cb(null, require('../pages/Error').default)
                  })
                })
                .catch(() => cb(null, Loading))
            }}
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
