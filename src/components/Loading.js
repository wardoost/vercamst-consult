import { PropTypes } from 'react'
import { Component } from 'jumpsuit'
import Footer from './Footer'
import './Loading.sass'

export default Component({
  propTypes: {
    fullPage: PropTypes.bool,
    label: PropTypes.string
  },

  getDefaultProps () {
    return {
      fullPage: false,
      label: ''
    }
  },

  render () {
    const {fullPage, label} = this.props

    if (fullPage) {
      return (
        <main className='content-container loading'>
          <div className='loading-animation'>
            <i className='icon-circle-notch icon-spin' />
            {label ? <p>{label}</p> : null}
          </div>
          <Footer />
        </main>
      )
    } else {
      return (
        <div className='loading'>
          <div className='loading-animation'>
            <i className='icon-circle-notch icon-spin' />
            {label ? <p>{label}</p> : null}
          </div>
        </div>
      )
    }
  }
})
