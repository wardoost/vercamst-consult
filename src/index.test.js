import ReactDOM from 'react-dom'
import App from './core/Router'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})
