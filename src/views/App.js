import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import ReactGA from 'react-ga';
import routes from './pages/routes';
import store from '../core/store';

export default class App extends Component {
  componentWillMount(){
    ReactGA.initialize('UA-79882435-1');
  }
  logPageView() {
    window.scrollTo(0, 0)
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory} onUpdate={this.logPageView} routes={routes} />
      </Provider>
    )
  }
}
