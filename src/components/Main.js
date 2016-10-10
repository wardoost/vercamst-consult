import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Router from './core/Router';
import store from '../redux/store';

export default class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}
