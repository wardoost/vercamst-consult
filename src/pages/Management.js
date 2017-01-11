import { Grid, Row, Col, Table, Button, Tabs, Tab, Alert } from 'react-bootstrap'
import { Component, Link } from 'jumpsuit'
import managementState, { loadAllPosts, deletePublishedPost, updatePublishedPost, deleteUnpublishedPost, updateUnpublishedPost } from '../state/management'
import { authLogout } from '../state/auth'
import SplashPage from '../components/SplashPage'
import Loading from '../components/Loading'
import PostItem from '../components/PostItem'
import './Management.sass'

export default Component({
  componentWillMount () {
    loadAllPosts()
  },

  componentWillUnmount () {
    managementState.reset()
  },

  createPosts (posts, published) {
    const { loadingPublished, loadingUnpublished } = this.props

    if (published ? loadingPublished : loadingUnpublished) {
      return <Loading />
    } else if (posts ? !posts.length : published ? loadingPublished : loadingUnpublished) {
      return <p>Geen {published ? 'gepubliceerde' : 'ongepubliceerde'} posts beschikbaar.</p>
    } else if (posts ? posts.length : false) {
      return (
        <Table responsive hover>
          <thead>
            <tr>
              <th>Titel</th>
              <th>Gemaakt op</th>
              <th>Laatste update</th>
              <th className='actions'>Acties</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => {
              return (
                <PostItem
                  key={post.key}
                  post={post}
                  published={published}
                  deletePost={published ? deletePublishedPost : deleteUnpublishedPost}
                  updatePost={published ? updatePublishedPost : updateUnpublishedPost}
                />
              )
            })}
          </tbody>
        </Table>
      )
    }
  },

  render () {
    return (
      <SplashPage
        className='management'
        title='Blog beheer'
        splashHeight={0.3}>
        <section className='management-content'>
          { this.props.error && this.props.showAlert
          ? <Alert bsStyle='danger' onDismiss={managementState.dismissAlert}>
            <div className='container'>
              {this.props.error.message}
            </div>
          </Alert>
          : null }
          <Grid>
            <Row>
              <Col md={12}>
                <Tabs defaultActiveKey={1} id='tabs-posts' animation={false}>
                  <Tab eventKey={1} title='Gepubliceerde posts'>
                    {this.createPosts(this.props.posts.published, true)}
                  </Tab>
                  <Tab eventKey={2} title='Ongepubliceerde posts'>
                    {this.createPosts(this.props.posts.unpublished, false)}
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </Grid>
        </section>
        <section className='management-actions'>
          <Grid>
            <Row>
              <Col md={12}>
                <Link to='/posts/add' className='btn btn-primary'>
                  <i className='icon-plus' /> Nieuwe post aanmaken
                </Link>
                <Button bsStyle='primary' className='pull-right' onClick={authLogout}>
                  <i className='icon-logout' /> Log uit
                </Button>
              </Col>
            </Row>
          </Grid>
        </section>
      </SplashPage>
    )
  }
}, state => {
  return {
    ...state.management
  }
})
