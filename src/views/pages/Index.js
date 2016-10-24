import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {scroller} from 'react-scroll';
import logo from '../../assets/logo-large.svg';
import Who from '../sections/Who';
import Themes from '../sections/Themes'
import Participation from '../sections/Participation';
import Blog from '../sections/Blog';
import Contact from '../sections/Contact';
import Footer from '../components/Footer';
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
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.location.pathname !== nextProps.location.pathname;
  }
  render() {
    return (
      <main className="index">
        <div className="splash-container">
          <div className="splash">
            <img src={logo} className="logo" alt="Vercamst Consult" />
          </div>
        </div>
        <div className="content-container invert-sections">
          <Button onClick={this.scrollToContent} className="btn-show-content">
            <i className="fa fa-angle-double-down" />
          </Button>
          <Who />
          <div className="section-spacer" />
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