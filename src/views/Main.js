import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Router from './Router';
import store from '../core/store';

export default class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}
