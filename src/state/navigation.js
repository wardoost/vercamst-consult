import { State } from 'jumpsuit'
import { debounce } from 'lodash'

const navigationState = State('navigation', {
  initial: {
    menuOpen: false,
    activeScrollLink: null,
    goto: null,
    scrollEnd : false,
    showLogo: shouldShowLogo(),
    scrollDuration: 1000
  },

  toggleMenu: (state, payload) => ({
    menuOpen: !state.menuOpen
  }),

  closeMenu: (state, payload) => ({
    menuOpen: false
  }),

  setActive: (state, payload) => ({
    activeScrollLink: !state.goto ? payload : state.activeScrollLink
  }),

  scrollStart: (state, payload) => ({
    goto: payload,
    activeScrollLink: null
  }),

  handleScroll: (state, payload) => ({
    showLogo: shouldShowLogo(),
    scrollEnd: atScrollEnd()
  }),

  scrollEnd: (state, payload) => ({
    goto: null,
    activeScrollLink: payload
  }),

  error: (state, payload) => ({
    password: '',
    showAlert: true,
    error: payload,
    loading: false
  }),

  loading: (state, payload) => ({
    loading: payload ? true : false
  }),
})

export default navigationState

export function shouldShowLogo() {
  const currentPath = document.location.pathname,
        atHomePage = (currentPath === '/'),
        overSplash = (window.scrollY > window.innerHeight / 3 - 50);

  return !atHomePage ? true : overSplash
}

export function atScrollEnd() {
  const body = document.body,
        html = document.documentElement,
        maxScrollY = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight) - window.innerHeight

  return window.scrollY > 0 && (window.scrollY >= maxScrollY - window.innerHeight / 4);
}

const setActiveDebounced = debounce((to) => {
  navigationState.setActive(to)
}, 100)

export { setActiveDebounced as setActive }

const handleScrollDebounced = debounce(() => {
  navigationState.handleScroll()
}, 100)

export { handleScrollDebounced as handleScroll }
