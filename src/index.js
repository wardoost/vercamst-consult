import { Render } from 'jumpsuit'
import state from './core/state'
import App from './core/App'

Render(state, (
  <App />
))

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./core/App', () => {
      const NextApp = require('./core/App').default
      Render(state, (
        <NextApp />
      ))
    })
  }
}
