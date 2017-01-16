import { Component, Link as RouterLink, Goto } from 'jumpsuit'
import { Link as ScrollLink, Events, scrollSpy } from 'react-scroll'
import classNames from 'classnames'
import _ from 'lodash'
import { isRequireAuthPath } from '../core/Router'
import navigationState, { updateAll } from '../core/state/navigation'
import Logo from '-!babel!svg-react!../assets/logo.svg'
import './Navigation.sass'

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
  getDefaultProps () {
    return {
      logoScrollLink: true,
      scrollDuration: 1000
    }
  },

  getInitialState () {
    return {
      activeScrollLink: null,
      goto: null
    }
  },

  componentWillMount () {
    this.setActive = _.debounce(this.setActive, 250)
    this.handleScroll = _.debounce(this.handleScroll, 250)
  },

  handleScroll () {
    const { pathname } = this.props.location
    if (this.props.location.action !== 'POP' && pathname === '/') updateAll(pathname)
  },

  setActive (to) {
    this.setState({
      activeScrollLink: to
    })
  },

  componentDidMount () {
    const self = this
    Events.scrollEvent.register('begin', function (to, element) {
      self.setState({
        goto: to,
        activeScrollLink: null
      })
    })

    Events.scrollEvent.register('end', function (to, element) {
      if (to === 'top') {
        Goto({path: self.props.location.pathname}, false, true)
      } else if (to !== 'content-top') {
        Goto({hash: to}, false, true)
      }

      navigationState.updateLogo(self.props.location.pathname)

      self.setState({
        goto: null,
        activeScrollLink: to
      })
    })

    scrollSpy.update()

    window.addEventListener('scroll', this.handleScroll)
  },

  componentWillUnmount () {
    Events.scrollEvent.remove('begin')
    Events.scrollEvent.remove('end')

    window.removeEventListener('scroll', this.handleScroll)
  },

  createMenu () {
    return menu.map((item, i) => {
      const { path, to, title } = item
      const { location, scrollDuration, showLogo, atScrollEnd } = this.props
      const { goto, activeScrollLink } = this.state
      const currentPath = location.pathname
      const pathMatched = (path === currentPath)
      const url = to ? path + '#' + to : path

      if (pathMatched && to) {
        const activeScrollLinkMatched = (goto || activeScrollLink) === to
        const lastItemActive = atScrollEnd
        let isActive = false

        if (i < menu.length - 1) {
          isActive = pathMatched && showLogo && activeScrollLinkMatched && !lastItemActive
        } else {
          isActive = pathMatched && showLogo && (activeScrollLinkMatched || lastItemActive)
        }

        return (
          <li key={url} role='presentation' className={classNames({'active': isActive})}>
            <ScrollLink
              to={to}
              spy
              smooth
              duration={scrollDuration}
              offset={-50}
              isDynamic
              onSetActive={this.setActive}
              className='nav-link'
              role='button'>
              {title}
            </ScrollLink>
          </li>
        )
      } else {
        const isActive = pathMatched

        return (
          <li key={url} role='presentation' className={classNames({'active': isActive})}>
            <RouterLink className='nav-link' role='button' to={url}>
              {title}
            </RouterLink>
          </li>
        )
      }
    })
  },

  render () {
    const { menuOpen, authenticated, logoScrollLink, scrollDuration, location, showLogo } = this.props

    return (
      <nav className='navbar navbar-default navbar-fixed-top'>
        <div className='container'>
          <div className='navbar-header'>
            { logoScrollLink
            ? <ScrollLink
              to='top'
              spy={false}
              smooth
              duration={scrollDuration}
              isDynamic
              className={classNames('navbar-brand', {'show': showLogo || menuOpen})}
              role='button'>
              <Logo className='logo' alt='Vercamst Consult' />
            </ScrollLink>
            : <RouterLink
              to='/'
              className={classNames('navbar-brand', {'show': showLogo || menuOpen})}>
              <Logo className='logo' alt='Vercamst Consult' />
            </RouterLink>
            }
            <button
              type='button'
              className={classNames('navbar-toggle', {'open': menuOpen})}
              onClick={navigationState.toggleMenu}>
              <div className='icon-hamburger'>
                <span />
                <span />
                <span />
              </div>
            </button>
          </div>
          <ul className={classNames('nav', 'navbar-nav', {'open': menuOpen, 'center': !showLogo})}>
            {this.createMenu()}
            {authenticated
            ? <li role='presentation' className={classNames({'active': isRequireAuthPath(location.pathname)})}>
              <RouterLink title='Beheer' className='nav-link nav-link-management' to={'/management'} role='button'>
                <i className='icon-cog' />
              </RouterLink>
            </li>
            : null}
          </ul>
        </div>
      </nav>
    )
  }
}, state => {
  return {
    ...state.navigation,
    authenticated: Boolean(state.auth.uid)
  }
})
