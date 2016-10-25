import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link as RouterLink, browserHistory} from 'react-router';
import {Link as ScrollLink, Events, scrollSpy} from 'react-scroll';
import classNames from 'classnames';
import {debounce} from 'lodash';
import logo from '../../../assets/logo.svg';
import './style.sass';

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

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      activeScrollLink: null,
      goto: null,
      scrollEnd : false,
      showLogo: this.shouldShowLogo(),
      scrollDuration: 1000
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
    const currentPath = document.location.pathname,
          atHomePage = (currentPath === "/"),
          overSplash = (window.scrollY > window.innerHeight / 3 - 50);

    return !atHomePage ? true : overSplash
  }
  atScrollEnd() {
    const body = document.body,
          html = document.documentElement,
          maxScrollY = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight) - window.innerHeight

    return window.scrollY > 0 && (window.scrollY >= maxScrollY - window.innerHeight / 4);
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
      const currentPath = self.props.location.pathname;

      if (to !== "top" && to !== "post-top") {
        browserHistory.replace(currentPath + "#" + to);
      }

      self.setState({
        goto: to,
        activeScrollLink: null
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

     window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');

    window.removeEventListener('scroll', this.handleScroll);
  }
  getMenu() {
    return menu.map((item, i) => {
      const {path, to, title} = item,
            currentPath = this.props.location.pathname,
            pathMatched = (path === currentPath),
            activeScrollLinkMatched = ((this.state.goto ? this.state.goto : this.state.activeScrollLink) === to),
            url = to ? path + "#" + to : path,
            lastItemActive = this.atScrollEnd();

      if (pathMatched && to) {
        let isActive = false;

        if (i < menu.length - 1) {
          isActive = pathMatched && this.state.showLogo && activeScrollLinkMatched && !lastItemActive;
        } else {
          isActive = pathMatched && this.state.showLogo && (activeScrollLinkMatched || lastItemActive);
        }

        return(
          <li key={url} role="presentation" className={classNames({"active": isActive})}>
            <ScrollLink to={to} spy={true} smooth={true} duration={this.state.scrollDuration} offset={-50} isDynamic={true} onSetActive={this.handleSetActive} className="nav-link" role="button">{title}</ScrollLink>
          </li>
        )

      } else {
        const isActive = pathMatched;

        return(
          <li key={url} role="presentation" className={classNames({"active": isActive})}>
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
              <ScrollLink
                to={"top"}
                spy={false}
                smooth={true}
                duration={this.state.scrollDuration}
                isDynamic={true}
                className={classNames("navbar-brand", {"show": this.state.showLogo || this.state.menuOpen})}
                role="button">
                <img src={logo} alt="Vercamst Consult" />
              </ScrollLink>
              :
              <RouterLink
                to="/"
                className={classNames("navbar-brand", {"show": this.state.showLogo || this.state.menuOpen })}>
                <img src={logo} alt="Vercamst Consult" />
              </RouterLink>
            }
            <button
              type="button"
              className={classNames("navbar-toggle", {"open": this.state.menuOpen})}
              onClick={this.toggleMenu}>
              <div className="icon-hamburger">
                <span />
                <span />
                <span />
              </div>
            </button>
          </div>
          <ul className={classNames("nav", "navbar-nav", {"open": this.state.menuOpen, "center": !this.state.showLogo})}>
            {this.getMenu()}
            {this.props.uid ?
              <li role="presentation" className={classNames({"active": this.props.location.pathname === "/management"})}>
                <RouterLink to="/management" title="Beheer" className="nav-link" role="button">
                  <i className="fa fa-cog"/>
                </RouterLink>
              </li>
            : null}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (store) => {
  return store.auth;
}

export default connect(mapStateToProps)(Navigation);