import { Component, Router, Route, IndexRoute, Hook, Goto } from 'jumpsuit'
import ReactGA from 'react-ga'
import { authInit, isInitialized, isAuthenticated } from './state/auth'
import navigationState, { updateAll } from './state/navigation'
import { chunkLoaded, lazyLoadChunk } from './state/chunks'
import Layout from '../components/Layout'

export default Component({
  componentWillMount () {
    authInit()
      .then(user => {
        const { pathname, hash } = document.location
        const authenticated = isAuthenticated()

        if (pathname === '/login') {
          authenticated ? Goto('/management') : Goto({path: pathname, hash: hash.substr(1)}, false, true)
        } else if (isRequireAuthPath(pathname)) {
          !authenticated ? Goto('/login') : Goto({path: pathname, hash: hash.substr(1)}, false, true)
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
                  }, 'index')
                })
                .catch(component => cb(null, component))
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
                  }, 'addpost')
                })
                .catch(component => cb(null, component))
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
                  }, 'post')
                })
                .catch(component => cb(null, component))
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
                  }, 'editpost')
                })
                .catch(component => cb(null, component))
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
                  }, 'login')
                })
                .catch(component => cb(null, component))
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
                  }, 'management')
                })
                .catch(component => cb(null, component))
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
                  }, 'error')
                })
                .catch(component => cb(null, component))
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
      if (payload.action !== 'REPLACE') {
        window.scrollTo(0, 0)
        updateAll(payload.pathname)

        if (process.env.NODE_ENV === 'production') {
          ReactGA.set({ page: payload.pathname })
          ReactGA.pageview(payload.pathname)
        }
      }

      navigationState.toggleMenu(false)
      break
  }
})

export function isRequireAuthPath (path) {
  return /(\/management|\/posts\/add|^\/posts\/.*\/edit)$/.test(path)
}
