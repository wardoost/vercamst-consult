import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {scroller} from 'react-scroll';
import Navigation from './Navigation';
import Intro from './sections/Intro';
import Who from './sections/Who';
import Themes from './sections/Themes'
import Participation from './sections/Participation';
import Blog from './sections/Blog';
import Contact from './sections/Contact';
import Footer from './Footer'
import './Layout.sass';

export default class Layout extends Component {
  scrollToContent() {
    scroller.scrollTo("wie", {
      smooth: true,
      duration: 500
    });
  }
  render() {
    return (
      <div className="App">
        <Navigation />
        <main className="content">
          <div className="splash-container">
            <div className="splash">
              <Intro />
            </div>
          </div>
          <div className="content-container">
            <Button onClick={this.scrollToContent} className="btn-show-content">
              <i className="fa fa-angle-double-down" />
            </Button>
            <Who />
            <Themes />
            <Participation />
            <Blog />
            <Contact />
            <Footer />
          </div>
        </main>
      </div>
    )
  }
}
