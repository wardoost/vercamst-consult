import React, {Component} from 'react';
import Navigation from './Navigation';
import './style.sass';

export default class Layout extends Component {
  render() {
    return (
      <div className="main" id="top">
        <Navigation location={this.props.location} logoScrollLink={this.props.location.pathname === "/"}/>
        {this.props.children}
      </div>
    )
  }
}
