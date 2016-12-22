import React, {Component} from 'react';
import Navigation from '../Navigation';
import 'bootstrap/dist/css/bootstrap.css';
import './style.sass';
import './fonts.css';

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
