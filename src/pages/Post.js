import { Component, Link } from 'jumpsuit'
import { Grid, Row, Col, Alert } from 'react-bootstrap'
import moment from 'moment'
import postState, { loadPost } from '../core/state/post'
import { isAuthenticated } from '../core/state/auth'
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
    const { post, loading, published } = this.props

    if (loading && !post) {
      return <Loading label='Loading blogpost' fullPage />
    } else if ((!loading && !post) || (!published && !isAuthenticated())) {
      return <Error typeString='post' />
    } else {
      const { title, body, createdAt } = post
      const { error, showAlert } = this.props

      return (
        <SplashPage
          className='post'
          title={title}
          subTitle={'Gepost op ' + moment(createdAt).format('dddd D MMMM YYYY')}
          splashHeight={0.4}
          scrollToContent>
          <section className='post-content'>
            { error && showAlert
              ? <Alert bsStyle='danger' onDismiss={postState.dismissAlert}>
                <div className='container'>
                  {error.message}
                </div>
              </Alert>
              : null }
            { !published && showAlert
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
