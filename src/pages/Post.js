import React from 'react'
import { Grid, Row, Col, Alert } from 'react-bootstrap'
import { Component } from 'jumpsuit'
import moment from 'moment'
import postState, { loadPost } from '../state/post'
import SplashPage from '../components/SplashPage'
import Loading from '../components/Loading'
import './Post.sass'

moment.locale('nl');

export default Component({
  componentWillMount() {
    loadPost(this.props.params.id);
  },

  componentWillUnmount() {
    postState.unload();
  },

  render() {
    if (this.props.post) {
      const {title, createdAt, body} = this.props.post;

      return (
        <SplashPage
          className="post"
          title={title}
          subTitle={"Gepost op " + moment(createdAt).format("dddd D MMMM YYYY")}
          splashHeight={0.4}
          scrollToContent={true}>
          <section className="post-content">
            { this.props.error && this.props.showAlert ?
              <Alert bsStyle="danger" onDismiss={postState.dismissAlert}>
                <div className="container">
                  {this.props.error.message}
                </div>
              </Alert>
            : null }
            <Grid>
              <Row>
                <Col md={12}>
                  <div className="post-body" dangerouslySetInnerHTML={{__html: body}} />
                </Col>
              </Row>
            </Grid>
          </section>
        </SplashPage>
      )
    } else {
      return (
        <Loading fullPage={true} />
      )
    }
  }
}, state => {
  return {
    ...state.post
  }
})
