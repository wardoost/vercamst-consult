import React, {Component} from 'react';
import Navigation from './Navigation';
import Intro from './sections/Intro';
import Who from './sections/Who';
import Participation from './sections/Participation';
import Blog from './sections/Blog';
import Contact from './sections/Contact';
import './Layout.sass';

export default class Layout extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Intro />
        <Who />
        <Participation />
        <Blog />
        <Contact />
      </div>
    )
  }
}
