import { State } from 'jumpsuit'

const navigationState = State('navigation', {
  initial: {
    menuOpen: false,
    showLogo: getShowLogo(document.location.pathname),
    atScrollEnd: getAtEndScroll()
  },

  toggleMenu: (state, payload) => ({
    menuOpen: typeof payload === 'boolean' ? payload : !state.menuOpen
  }),

  updateLogo: (state, payload) => ({
    showLogo: getShowLogo(typeof payload === 'string' ? payload : document.location.pathname)
  }),

  updateAtScrollEnd: (state, payload) => ({
    atScrollEnd: getAtEndScroll()
  })
})

export default navigationState

function getShowLogo (currentPath) {
  return currentPath !== '/' ? true : window.scrollY > window.innerHeight / 3 - 50
}

function getAtEndScroll () {
  const body = document.body
  const html = document.documentElement
  const maxScrollY = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight) - window.innerHeight

  return window.scrollY > 0 && (window.scrollY >= maxScrollY - window.innerHeight / 4)
}

export function updateAll (currentPath) {
  navigationState.updateLogo(currentPath)
  navigationState.updateAtScrollEnd()
}
