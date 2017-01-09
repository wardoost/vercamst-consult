import { Component, Link as RouterLink, Goto } from 'jumpsuit'
import { Link as ScrollLink, Events, scrollSpy } from 'react-scroll'
import classNames from 'classnames'
import _ from 'lodash'
import { isRequireAuthPath } from '../core/App'
import logo from '../assets/logo.svg'
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
      menuOpen: false,
      activeScrollLink: null,
      goto: null,
      scrollEnd: false,
      showLogo: this.shouldShowLogo()
    }
  },

  componentWillMount () {
    this.setActive = _.debounce(this.setActive, 100)
    this.handleScroll = _.debounce(this.handleScroll, 100)
  },

  shouldShowLogo () {
    const currentPath = document.location.pathname
    const atHomePage = (currentPath === '/')
    const overSplash = (window.scrollY > window.innerHeight / 3 - 50)

    return !atHomePage ? true : overSplash
  },

  toggleMenu () {
    const { menuOpen } = this.state
    this.setState({ menuOpen: !menuOpen })
  },

  atScrollEnd () {
    const body = document.body
    const html = document.documentElement
    const maxScrollY = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight) - window.innerHeight

    return window.scrollY > 0 && (window.scrollY >= maxScrollY - window.innerHeight / 4)
  },

  setActive (to) {
    this.setState({
      activeScrollLink: to
    })
  },

  handleScroll () {
    const { shouldShowLogo, atScrollEnd } = this

    this.setState({
      showLogo: shouldShowLogo(),
      scrollEnd: atScrollEnd()
    })
  },

  onMenuLinkClick (url, e) {
    e.preventDefault()

    Goto(url)
    const { shouldShowLogo } = this
    this.setState({
      menuOpen: false,
      showLogo: shouldShowLogo()
    })
  },

  componentDidMount () {
    const self = this

    Events.scrollEvent.register('begin', function (to, element) {
      if (to !== 'top' && to !== 'content-top') {
        Goto({hash: to}, false, true)
      }

      self.setState({
        goto: to,
        activeScrollLink: null,
        menuOpen: false
      })
    })

    Events.scrollEvent.register('end', function (to, element) {
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

  getMenu () {
    return menu.map((item, i) => {
      const { path, to, title } = item
      const { location, scrollDuration } = this.props
      const { goto, activeScrollLink, showLogo } = this.state
      const currentPath = location.pathname
      const pathMatched = (path === currentPath)
      const activeScrollLinkMatched = (goto || activeScrollLink) === to
      const url = to ? path + '#' + to : path
      const lastItemActive = this.atScrollEnd()

      if (pathMatched && to) {
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
            <a className='nav-link' role='button' onClick={this.onMenuLinkClick.bind(null, url)}>{title}</a>
          </li>
        )
      }
    })
  },

  render () {
    const { authenticated, logoScrollLink, scrollDuration, location } = this.props
    const { showLogo, menuOpen } = this.state

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
              <img src={logo} alt='Vercamst Consult' />
            </ScrollLink>
            : <RouterLink
              to='/'
              className={classNames('navbar-brand', {'show': showLogo || menuOpen})}>
              <img src={logo} alt='Vercamst Consult' />
            </RouterLink>
            }
            <button
              type='button'
              className={classNames('navbar-toggle', {'open': menuOpen})}
              onClick={this.toggleMenu}>
              <div className='icon-hamburger'>
                <span />
                <span />
                <span />
              </div>
            </button>
          </div>
          <ul className={classNames('nav', 'navbar-nav', {'open': menuOpen, 'center': !showLogo})}>
            {this.getMenu()}
            {authenticated
            ? <li role='presentation' className={classNames({'active': isRequireAuthPath(location.pathname)})}>
              <a title='Beheer' className='nav-link nav-link-management' onClick={this.onMenuLinkClick.bind(null, '/management')} role='button'>
                <i className='icon-cog' />
              </a>
            </li>
            : null}
          </ul>
        </div>
      </nav>
    )
  }
}, state => {
  return {
    authenticated: Boolean(state.auth.uid)
  }
})
