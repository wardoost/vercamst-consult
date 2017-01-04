import React, { PropTypes } from 'react'
import { Component } from 'jumpsuit'
import Footer from '../Footer'
import './style.sass'

export default Component({
  propTypes: {
    fullPage: PropTypes.bool
  },

  defaultProps: {
    fullPage: false
  },

  render() {
    if (this.props.fullPage) {
      return(
        <main className="content-container loading">
          <div className="loading-animation">
            <i className="icon-circle-notch icon-spin" />
          </div>
          <Footer />
        </main>
      )
    } else {
      return(
        <div className="loading">
          <div className="loading-animation">
            <i className="icon-circle-notch icon-spin" />
          </div>
        </div>
      )
    }
  }
})
