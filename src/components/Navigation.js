import React, {Component} from 'react';
import logo from '../assets/logo.svg';
import {Link as RouterLink} from 'react-router';
import {Link as ScrollLink, Events, scrollSpy} from 'react-scroll';
import {debounce} from 'lodash';
import './Navigation.sass';

const menu = [
  {
    title: "Wie",
    path: "/",
    to: "wie"
  },
  {
    title: "Thema's",
    path: "/",
    to: "themas"
  },
  {
    title: "Werknemersparticipatie",
    path: "/",
    to: "werknemersparticipatie"
  },
  {
    title: "Blog",
    path: "/",
    to: "blog"
  },
  {
    title: "Contact",
    path: "/",
    to: "contact"
  }
]

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      activeScrollLink: null,
      goto: null,
      scrollEnd : false,
      showLogo: this.shouldShowLogo()
    }

    this.handleScroll = debounce(this.handleScroll.bind(this), 50);
    this.handleSetActive = this.handleSetActive.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  toggleMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }
  closeMenu() {
    this.setState({
      menuOpen: false
    });
  }
  shouldShowLogo() {
    const atHomePage = (document.location.pathname === "/"),
          overSplash = (window.scrollY > window.innerHeight / 3 - 50);

    // Add update url hash here
    return !atHomePage ? true : overSplash
  }
  handleSetActive(to) {
    this.setState({
      activeScrollLink: to,
    });

    // Add update url hash here
  }
  handleScroll(e) {
    const body = document.body,
          html = document.documentElement,
          maxScrollY = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight) - window.innerHeight;

    this.setState({
      showLogo: this.shouldShowLogo(),
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
      const {path, to, title} = item,
            pathMatched = (path === document.location.pathname),
            activeScrollLinkMatched = ((this.state.goto ? this.state.goto : this.state.activeScrollLink) === to),
            url = to ? path + "#" + to : path;

      if (pathMatched && to) {
        let isActive;

        if (i < menu.length - 1) {
          isActive = pathMatched && activeScrollLinkMatched && !this.state.scrollEnd && this.state.showLogo;
        } else {
          isActive = pathMatched && (activeScrollLinkMatched || this.state.scrollEnd) && this.state.showLogo;
        }

        return(
          <li key={url} role="presentation" className={isActive ? "active" : ""}>
            <ScrollLink to={to} spy={true} smooth={true} duration={1000} offset={-50} isDynamic={true} onSetActive={this.handleSetActive} className="nav-link" role="button">{title}</ScrollLink>
          </li>
        )

      } else {
        const isActive = pathMatched;

        return(
          <li key={url} role="presentation" className={isActive ? "active" : ""}>
            <RouterLink to={url} className="nav-link" role="button">{title}</RouterLink>
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
            <a href="/" className={"navbar-brand" + (this.state.showLogo || this.state.menuOpen ? " show" : "")}><img src={logo} alt="Vercamst Consult" /></a>
            <button type="button" className={"navbar-toggle" + (this.state.menuOpen ? " open" : "")} onClick={this.toggleMenu}>
              <div className="icon-hamburger">
                <span />
                <span />
                <span />
              </div>
            </button>
          </div>
          <ul className={"nav navbar-nav" + (this.state.menuOpen ? " open" : "") + (!this.state.showLogo ? " center" : "")}>
            {this.getMenu()}
          </ul>
        </div>
      </nav>
    );
  }
}
