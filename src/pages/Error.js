import Helmet from 'react-helmet'
import { Component, Link, Goto } from 'jumpsuit'
import Footer from '../components/Footer'
import './Error.sass'

export default Component({
  goBack (e) {
    e.preventDefault()

    Goto.back()
  },

  render () {
    return (
      <main className='content-container error'>
        <Helmet title='Page not found' />
        <div className='content-error'>
          <div>
            <h1>Page not found...</h1>
            <p>You can go <a onClick={this.goBack}>back</a> or to the <Link to='/'>homepage</Link></p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }
})
