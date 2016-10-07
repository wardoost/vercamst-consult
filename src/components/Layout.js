import React, {Component} from 'react';
import Navigation from './Navigation';
import './Layout.sass';

export default class Layout extends Component {
  render() {
    return (
      <div className="layout" id="welcome">
        <Navigation location={this.props.location} logoScrollLink={this.props.location.pathname === "/"}/>
        {this.props.children}
      </div>
    )
  }
}
