import { PropTypes } from 'react'
import { Component } from 'jumpsuit'
import Helmet from 'react-helmet'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { scroller } from 'react-scroll'
import classNames from 'classnames'
import Footer from './Footer'
import './SplashPage.sass'

export default Component({
  propTypes: {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    splashHeight: PropTypes.number,
    scrollToContent: PropTypes.bool
  },

  getDefaultProps () {
    return {
      title: undefined,
      subTitle: undefined,
      splashHeight: 0.5,
      scrollToContent: false
    }
  },

  handleScrollToContent () {
    scroller.scrollTo('content-top', {
      smooth: true,
      duration: 500
    })
  },

  render () {
    const { title, subTitle, splashHeight, scrollToContent } = this.props
    const styles = {
      container: {
        height: (splashHeight * 100) + '%'
      },
      content: {
        top: (splashHeight * 100) + '%',
        minHeight: ((1 - splashHeight) * 100) + '%'
      }
    }

    return (
      <main className={classNames('splash-page', this.props.className)}>
        <Helmet title={title} />
        <div className='splash-container' style={styles.container}>
          <div className='splash'>
            <header className='splash-header'>
              <Grid>
                <Row>
                  <Col md={12}>
                    <h1>{title}</h1>
                    <p className='text-muted'>{subTitle}</p>
                  </Col>
                </Row>
              </Grid>
            </header>
          </div>
        </div>
        <div
          className={classNames('content-container', {'invert-sections': scrollToContent})}
          style={styles.content}
          id='content-top'>
          {scrollToContent
          ? <Button onClick={this.handleScrollToContent} className='btn-show-content'>
            <i className='icon-angle-double-down' />
          </Button>
          : null}
          {this.props.children}
          <Footer />
        </div>
      </main>
    )
  }
})
