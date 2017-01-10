import { Component, Link } from 'jumpsuit'
import { Grid, Row, Col, Alert } from 'react-bootstrap'
import moment from 'moment'
import postState, { loadPost } from '../state/post'
import { isAuthenticated } from '../state/auth'
import SplashPage from '../components/SplashPage'
import Loading from '../components/Loading'
import Error from './Error'
import './Post.sass'

moment.locale('nl')

export default Component({
  componentWillMount () {
    loadPost(this.props.params.key)
  },

  componentWillUnmount () {
    postState.reset()
  },

  render () {
    if (this.props.loading && !this.props.post) {
      return <Loading label='Loading blogpost' fullPage />
    } else if ((!this.props.loading && !this.props.post) || (!this.props.published && !isAuthenticated())) {
      return <Error TypeString='post' />
    } else {
      const { title, body, createdAt } = this.props.post

      return (
        <SplashPage
          className='post'
          title={title}
          subTitle={'Gepost op ' + moment(createdAt).format('dddd D MMMM YYYY')}
          splashHeight={0.4}
          scrollToContent>
          <section className='post-content'>
            { this.props.error && this.props.showAlert
              ? <Alert bsStyle='danger' onDismiss={postState.dismissAlert}>
                <div className='container'>
                  {this.props.error.message}
                </div>
              </Alert>
              : null }
            { !this.props.published && this.props.showAlert
              ? <Alert bsStyle='warning' onDismiss={postState.dismissAlert}>
                <div className='container'>
                  Deze post is niet zichbaar voor bezoekers. Misschien wil je deze post <Link to={`/posts/${this.props.params.key}/edit`}>publiceren</Link>?
                </div>
              </Alert>
              : null}
            <Grid>
              <Row>
                <Col md={12}>
                  <div className='post-body' dangerouslySetInnerHTML={{__html: body}} />
                </Col>
              </Row>
            </Grid>
          </section>
        </SplashPage>
      )
    }
  }
}, state => {
  return {
    ...state.post
  }
})
