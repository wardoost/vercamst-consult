import React from 'react'
import { Render } from 'jumpsuit'
import state from './state'
import App from './views/App'

Render(state, (
  <App />
))

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default;
    Render(state, (
      <NextApp />
    ))
  });
}
