import React from 'react'
import { Component, Link as RouterLink, Goto, getState } from 'jumpsuit'
import {Link as ScrollLink, Events, scrollSpy} from 'react-scroll';
import classNames from 'classnames';
import navigationState, { atScrollEnd, setActive, handleScroll } from '../../../state/navigation'
import logo from '../../../assets/logo.svg';
import './style.sass';

const menu = [
  {
    title: 'Wie',
    path: '/',
    to: 'wie'
  },
  {
    title: 'Thema\'s',
    path: '/',
    to: 'themas'
  },
  {
    title: 'Werknemersparticipatie',
    path: '/',
    to: 'werknemersparticipatie'
  },
  {
    title: 'Blog',
    path: '/',
    to: 'blog'
  },
  {
    title: 'Contact',
    path: '/',
    to: 'contact'
  }
]

export default Component({
  onMenuLinkClick(url, e) {
    e.preventDefault();
    navigationState.closeMenu();
    Goto(url);
  },

  componentDidMount() {
    Events.scrollEvent.register('begin', function(to, element) {
      const currentPath = getState().routing.locationBeforeTransitions.pathname;

      if (to !== 'top' && to !== 'post-top') {
        Goto(currentPath + '#' + to);
      }

      navigationState.scrollStart(to);
      navigationState.closeMenu();
    });

    Events.scrollEvent.register('end', function(to, element) {
      navigationState.scrollEnd(to);
    });

    scrollSpy.update();

     window.addEventListener('scroll', handleScroll);
  },

  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');

    window.removeEventListener('scroll', handleScroll);
  },

  getMenu() {
    return menu.map((item, i) => {
      const {path, to, title} = item,
            currentPath = this.props.location.pathname,
            pathMatched = (path === currentPath),
            activeScrollLinkMatched = ((this.props.goto ? this.props.goto : this.props.activeScrollLink) === to),
            url = to ? path + '#' + to : path,
            lastItemActive = atScrollEnd();

      if (pathMatched && to) {
        let isActive = false;

        if (i < menu.length - 1) {
          isActive = pathMatched && this.props.showLogo && activeScrollLinkMatched && !lastItemActive;
        } else {
          isActive = pathMatched && this.props.showLogo && (activeScrollLinkMatched || lastItemActive);
        }

        return(
          <li key={url} role="presentation" className={classNames({"active": isActive})}>
            <ScrollLink to={to} spy={true} smooth={true} duration={this.props.scrollDuration} offset={-50} isDynamic={true} onSetActive={setActive} className="nav-link" role="button">{title}</ScrollLink>
          </li>
        )

      } else {
        const isActive = pathMatched;

        return(
          <li key={url} role="presentation" className={classNames({"active": isActive})}>
            <a className="nav-link" role="button" onClick={this.onMenuLinkClick.bind(null, url)}>{title}</a>
          </li>
        )
      }
    })
  },

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
                duration={this.props.scrollDuration}
                isDynamic={true}
                className={classNames("navbar-brand", {"show": this.props.showLogo || this.props.menuOpen})}
                role="button">
                <img src={logo} alt="Vercamst Consult" />
              </ScrollLink>
              :
              <RouterLink
                to="/"
                className={classNames("navbar-brand", {"show": this.props.showLogo || this.props.menuOpen })}>
                <img src={logo} alt="Vercamst Consult" />
              </RouterLink>
            }
            <button
              type="button"
              className={classNames("navbar-toggle", {"open": this.props.menuOpen})}
              onClick={navigationState.toggleMenu}>
              <div className="icon-hamburger">
                <span />
                <span />
                <span />
              </div>
            </button>
          </div>
          <ul className={classNames("nav", "navbar-nav", {"open": this.props.menuOpen, "center": !this.props.showLogo})}>
            {this.getMenu()}
            {this.props.authenticated ?
              <li role="presentation" className={classNames({"active": this.props.location.pathname === "/management"})}>
                <a title="Beheer" className="nav-link nav-link-management" onClick={this.onMenuLinkClick.bind(null, "/management")} role="button">
                  <i className="icon-cog"/>
                </a>
              </li>
            : null}
          </ul>
        </div>
      </nav>
    );
  }
}, state => {
  return {
    ...state.navigation,
    authenticated: state.auth.uid ? true : false
  }
})
