import { Render } from 'jumpsuit'
import state from './core/state'
import App from './core/Router'

Render(state, (
  <App />
))

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./core/Router', () => {
      const NextApp = require('./core/Router').default
      Render(state, (
        <NextApp />
      ))
    })
  }
}
