import React from 'react'
import { Render } from 'jumpsuit'
import state from './state'
import App from './core/App'

Render(state, (
  <App />
))

if (module.hot) {
  module.hot.accept('./core/App', () => {
    const NextApp = require('./core/App').default;
    Render(state, (
      <NextApp />
    ))
  });
}
