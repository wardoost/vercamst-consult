import { Grid, Row, Col, Table, Alert, Button } from 'react-bootstrap'
import { Component, Link } from 'jumpsuit'
import managementState, { loadPosts, deletePost, updatePost } from '../state/management'
import { authLogout } from '../state/auth'
import SplashPage from '../components/SplashPage'
import Loading from '../components/Loading'
import PostItem from '../components/PostItem'
import './Management.sass'

export default Component({
  componentWillMount () {
    loadPosts()
  },

  componentWillUnmount () {
    managementState.reset()
  },

  createPosts () {
    return this.props.posts.map(post => {
      return (
        <PostItem
          key={post.key}
          post={post}
          deletePost={deletePost}
          updatePost={updatePost}
        />
      )
    })
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
                : this.props.posts.length
                ? <Table responsive>
                  <thead>
                    <tr>
                      <th>Titel</th>
                      <th>Gemaakt op</th>
                      <th className='actions'>Acties</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.createPosts()}
                  </tbody>
                </Table>
                : <p>Geen posts beschikbaar.</p>
                }
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
