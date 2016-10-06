import React, {Component} from 'react';
import Navigation from './Navigation';
import './Layout.sass';

export default class Layout extends Component {
  render() {
    return (
      <div className="App">
        <Navigation/>
        {this.props.children}
      </div>
    )
  }
}
