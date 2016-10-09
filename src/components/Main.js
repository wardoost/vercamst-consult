import React, {Component} from 'react';
import Navigation from './ui/Navigation';
import './Main.sass';

export default class Main extends Component {
  render() {
    return (
      <div className="main" id="top">
        <Navigation location={this.props.location} logoScrollLink={this.props.location.pathname === "/"}/>
        {this.props.children}
      </div>
    )
  }
}
