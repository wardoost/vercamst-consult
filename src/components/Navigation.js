import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';
import logo from '../assets/logo.svg';
import {Link, Events, scrollSpy} from 'react-scroll';
import './Navigation.sass';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      active: null,
      goto: null,
      scrollEnd : false
    }

    this.handleScrollEnd = this.handleScrollEnd.bind(this);
    this.handleSetActive = this.handleSetActive.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  toggleMenu() {
    this.setState({
      open: !this.state.open
    });
  }
  closeMenu() {
    this.setState({
      open: false
    });
  }
  handleSetActive(to) {
    this.setState({
      active: to
    });

    // Add update url hash here
  }
  handleScrollEnd(e) {
    const body = document.body,
          html = document.documentElement,
          maxScrollY = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight) - window.innerHeight;

    if(window.scrollY >= maxScrollY - window.innerHeight / 4){
      this.setState({
        scrollEnd: true
      });
    } else {
      this.setState({
        scrollEnd: false
      });
    }
  }
  componentDidMount() {
    const self = this;

    Events.scrollEvent.register('begin', function(to, element) {
      self.setState({
        goto: to,
      });
      self.closeMenu();
    });

    Events.scrollEvent.register('end', function(to, element) {
      self.setState({
        goto: null,
      });
    });

    scrollSpy.update();

     window.addEventListener('scroll', this.handleScrollEnd.bind(this));
  }
  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');

    window.removeEventListener('scroll', this.handleScrollEnd.bind(this));
  }
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a href="/" className="navbar-brand"><img src={logo} alt="Vercamst Consult" /></a>
            <button type="button" className={"navbar-toggle" + (this.state.open ? " open" : "")} onClick={this.toggleMenu}>
              <div className="icon-hamburger">
                <span />
                <span />
                <span />
              </div>
            </button>
          </div>
          <ul className={"nav navbar-nav navbar-right" + (this.state.open ? " open" : "")}>
            <li role="presentation" to="wie" className={((this.state.goto ? this.state.goto : this.state.active) === "wie") && !this.state.scrollEnd ? "active" : ""}>
              <Link className="nav-link" to="wie" spy={true} smooth={true} duration={1000} offset={-50} onSetActive={this.handleSetActive} role="button">Wie</Link>
            </li>
            <li role="presentation" className={((this.state.goto ? this.state.goto : this.state.active) === "werknemersparticipatie") && !this.state.scrollEnd ? "active" : ""}>
              <Link className="nav-link" to="werknemersparticipatie" spy={true} smooth={true} duration={1000} offset={-50} onSetActive={this.handleSetActive} role="button">Werknemersparticipatie</Link>
            </li>
            <li role="presentation" className={((this.state.goto ? this.state.goto : this.state.active) === "blog") && !this.state.scrollEnd ? "active" : ""}>
              <Link className="nav-link" to="blog" spy={true} smooth={true} duration={1000} offset={-50} onSetActive={this.handleSetActive} role="button">Blog</Link>
            </li>
            <li role="presentation" className={((this.state.goto ? this.state.goto : this.state.active) === "contact") || this.state.scrollEnd ? "active" : ""}>
              <Link className="nav-link" to="contact" spy={true} smooth={true} duration={1000} offset={-50} onSetActive={this.handleSetActive} role="button">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
