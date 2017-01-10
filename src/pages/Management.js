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
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>Titel</th>
            <th>Gemaakt op</th>
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
  },

  createAllPosts (publishedPosts, unpublishedPosts) {
    if (publishedPosts.length || unpublishedPosts.length) {
      return (
        <Tabs defaultActiveKey={1} id='tabs-posts' animation={false}>
          <Tab eventKey={1} title='Published'>
            {this.createPosts(publishedPosts, true)}
          </Tab>
          <Tab eventKey={2} title='Drafts'>
            {this.createPosts(unpublishedPosts, false)}
          </Tab>
        </Tabs>
      )
    } else {
      return <p>Geen posts beschikbaar.</p>
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
                {this.props.loading
                  ? <Loading label='Loading all blogposts...' />
                  : this.createAllPosts(this.props.posts.published, this.props.posts.unpublished)}
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
