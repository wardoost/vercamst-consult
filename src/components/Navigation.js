import React, {Component} from 'react';
import logo from '../assets/logo.svg';
import {Link, Events, scrollSpy} from 'react-scroll';
import './Navigation.sass';

const menu = [
  {
    title: "Wie",
    path: "#wie",
    to: "wie"
  },
  {
    title: "Thema's",
    path: "#themas",
    to: "themas"
  },
  {
    title: "Werknemersparticipatie",
    path: "#werknemersparticipatie",
    to: "werknemersparticipatie"
  },
  {
    title: "Blog",
    path: "#blog",
    to: "blog"
  },
  {
    title: "Contact",
    path: "#contact",
    to: "contact"
  }
]

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      active: null,
      goto: null,
      scrollEnd : false,
      showLogo: false
    }

    this.handleScroll = this.handleScroll.bind(this);
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
      active: to,
    });

    // Add update url hash here
  }
  handleScroll(e) {
    const body = document.body,
          html = document.documentElement,
          maxScrollY = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight) - window.innerHeight;

    this.setState({
      showLogo: (window.scrollY > window.innerHeight / 3 - 50),
      scrollEnd: (window.scrollY >= maxScrollY - window.innerHeight / 4)
    });
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

     window.addEventListener('scroll', this.handleScroll.bind(this));
  }
  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');

    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }
  getMenu() {
    return menu.map((item, i) => {
      if(i < menu.length - 1) {
        return (
          <li key={item.path} role="presentation" className={((this.state.goto ? this.state.goto : this.state.active) === item.to) && !this.state.scrollEnd && this.state.showLogo ? "active" : ""}>
            <Link className="nav-link" to={item.to} spy={true} smooth={true} duration={1000} offset={-50} onSetActive={this.handleSetActive} isDynamic={true} role="button">{item.title}</Link>
          </li>
        )
      } else {
        return (
          <li key={item.path} role="presentation" className={(((this.state.goto ? this.state.goto : this.state.active) === item.to) || this.state.scrollEnd) && this.state.showLogo ? "active" : ""}>
            <Link className="nav-link" to={item.to} spy={true} smooth={true} duration={1000} offset={-50} onSetActive={this.handleSetActive} isDynamic={true} role="button">{item.title}</Link>
          </li>
        )
      }
    })
  }
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a href="/" className={"navbar-brand" + (this.state.showLogo || this.state.open ? " show" : "")}><img src={logo} alt="Vercamst Consult" /></a>
            <button type="button" className={"navbar-toggle" + (this.state.open ? " open" : "")} onClick={this.toggleMenu}>
              <div className="icon-hamburger">
                <span />
                <span />
                <span />
              </div>
            </button>
          </div>
          <ul className={"nav navbar-nav" + (this.state.open ? " open" : "") + (!this.state.showLogo ? " center" : "")}>
            {this.getMenu()}
          </ul>
        </div>
      </nav>
    );
  }
}
