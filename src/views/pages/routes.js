import Layout from '../components/Layout';
import {isAuthenticated} from '../../core/auth';
import Index from './Index';

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

export default {
  component: Layout,
  childRoutes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/posts/add',
      getComponent(location, cb) {
        require.ensure([], require => {
            cb(null, require('./AddPost').default)
        });
      }
    },
    {
      path: '/posts/:id',
      getComponent(location, cb) {
        require.ensure([], require => {
            cb(null, require('./Post').default)
        });
      }
    },
    {
      path: 'login',
      onEnter: noAuth,
      getComponent(location, cb) {
        require.ensure([], require => {
            cb(null, require('./Login').default)
        });
      }
    },
    {
      path: 'logout',
      onEnter: requireAuth,
      getComponent(location, cb) {
        require.ensure([], require => {
            cb(null, require('./Logout').default)
        });
      }
    },
    {
      path: 'management',
      onEnter: requireAuth,
      getComponent(location, cb) {
        require.ensure([], require => {
            cb(null, require('./Management').default)
        });
      }
    },
    {
      path: '*',
      getComponent(location, cb) {
        require.ensure([], require => {
            cb(null, require('./Error').default)
        });
      }
    }
  ]
};
