import { PropTypes } from 'react'
import { Component, Link, Goto } from 'jumpsuit'
import Helmet from 'react-helmet'
import _ from 'lodash'
import Footer from '../components/Footer'
import './Error.sass'

export default Component({
  propTypes: {
    typeString: PropTypes.string
  },

  getDefaultProps () {
    return {
      typeString: 'page'
    }
  },

  goBack (e) {
    e.preventDefault()

    Goto.back()
  },

  render () {
    const title = `${_.upperFirst(this.props.typeString)} not found`

    return (
      <main className='content-container error'>
        <Helmet title={title} />
        <div className='content-error'>
          <div>
            <h1>{title}...</h1>
            <p>You can go <a onClick={this.goBack}>back</a> or to the <Link to='/'>homepage</Link></p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }
})
