import React, {Component} from 'react';
import logo from '../assets/logo.svg';
import {Link as RouterLink, browserHistory} from 'react-router';
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
    activePaths: "/posts/",
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
    this.handleSetActive = debounce(this.handleSetActive.bind(this), 50);
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

    return !atHomePage ? true : overSplash
  }
  atScrollEnd() {
    const body = document.body,
          html = document.documentElement,
          maxScrollY = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight) - window.innerHeight;

    return (window.scrollY >= maxScrollY - window.innerHeight / 4);
  }
  handleSetActive(to) {
    if(!this.state.goto){
      this.setState({
        activeScrollLink: to,
      });
    }
  }
  handleScroll(e) {
    this.setState({
      showLogo: this.shouldShowLogo(),
      scrollEnd: this.atScrollEnd()
    });
  }
  componentDidMount() {
    const self = this;

    Events.scrollEvent.register('begin', function(to, element) {
      browserHistory.replace(document.location.pathname + "#" + to);

      self.setState({
        goto: to,
      });
      self.closeMenu();
    });

    Events.scrollEvent.register('end', function(to, element) {
      self.setState({
        goto: null,
        activeScrollLink: to
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
    let arr = [];
    return menu.map((item, i) => {
      const {path, activePaths, to, title} = item,
            pathMatched = (path === document.location.pathname),
            activePathsMatched = activePaths ? activePaths.includes(document.location.pathname) : false,
            activeScrollLinkMatched = ((this.state.goto ? this.state.goto : this.state.activeScrollLink) === to),
            url = to ? path + "#" + to : path,
            atScrollEnd = this.atScrollEnd();

      if (pathMatched && to) {
        let isActive;

        if (i < menu.length - 1) {
          isActive = (pathMatched || activePathsMatched) && this.state.showLogo && activeScrollLinkMatched && !atScrollEnd;
        } else {
          isActive = (pathMatched || activePathsMatched) && this.state.showLogo && (activeScrollLinkMatched || atScrollEnd);
        }

        arr.push(item.title + " active: " + isActive);

        return(
          <li key={url} role="presentation" className={isActive ? "active" : ""}>
            <ScrollLink to={to} spy={true} smooth={true} duration={300} offset={-50} isDynamic={true} onSetActive={this.handleSetActive} className="nav-link" role="button">{title}</ScrollLink>
          </li>
        )

      } else {
        const isActive = pathMatched || activePathsMatched;

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
            { this.props.logoScrollLink ?
              <ScrollLink to={"welcome"} spy={false} smooth={true} duration={300} isDynamic={true} className={"navbar-brand" + (this.state.showLogo || this.state.menuOpen ? " show" : "")} role="button">
                <img src={logo} alt="Vercamst Consult" />
              </ScrollLink>
              :
              <RouterLink to="/" className={"navbar-brand" + (this.state.showLogo || this.state.menuOpen ? " show" : "")}>
                <img src={logo} alt="Vercamst Consult" />
              </RouterLink>
            }
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
