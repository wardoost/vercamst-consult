import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {scroller} from 'react-scroll';
import Intro from '../sections/Intro';
import Who from '../sections/Who';
import Themes from '../sections/Themes'
import Participation from '../sections/Participation';
import Blog from '../sections/Blog';
import Contact from '../sections/Contact';
import Footer from '../Footer';
import './Index.sass';

export default class Index extends Component {
  scrollToContent() {
    scroller.scrollTo("wie", {
      smooth: true,
      duration: 500
    });
  }
  componentDidMount() {
    const hash = document.location.hash;
    if (hash) {
      scroller.scrollTo(hash.substring(1), {
        smooth: true,
        duration: 0,
        offset: -50,
        dynamic: true
      });

      // const el = document.getElementById(hash.substring(1)),
      //       offsetY = el ? el.offsetTop : 0;
      //
      // window.scrollTo(0, offsetY);
      //
      // console.log("scrolling to " + hash, offsetY)
    }
    console.log("mounted index!!!");
  }
  render() {
    return (
      <main className="index">
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
    )
  }
}
