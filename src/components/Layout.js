import React, {Component} from 'react';
import Navigation from './Navigation';
import Intro from './sections/Intro';
import './Layout.css';

export default class Layout extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Intro />
      </div>
    )
  }
}
