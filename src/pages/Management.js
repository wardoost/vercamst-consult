import { Component, Link } from 'jumpsuit'
import { Grid, Row, Col, Table, Button, Tabs, Tab, Alert } from 'react-bootstrap'
import _ from 'lodash'
import managementState, { loadAllPosts } from '../core/state/management'
import { authLogout } from '../core/state/auth'
import SplashPage from '../components/SplashPage'
import TableHeader from '../components/TableHeader'
import Loading from '../components/Loading'
import PostItem from '../components/PostItem'
import './Management.sass'

export default Component({
  getInitialState () {
    return {
      sortPublishedBy: 'createdAt',
      sortPublishedReverse: true,
      sortUnpublishedBy: 'createdAt',
      sortUnpublishedReverse: true
    }
  },

  handlePublishSort (key) {
    this.state.sortPublishedBy === key
    ? this.setState((prevState, props) => ({ sortPublishedReverse: !prevState.sortPublishedReverse }))
    : this.setState({ sortPublishedBy: key, sortPublishedReverse: false })
  },

  handleUnpublishSort (key) {
    this.state.sortUnpublishedBy === key
    ? this.setState((prevState, props) => ({ sortUnpublishedReverse: !prevState.sortUnpublishedReverse }))
    : this.setState({ sortUnpublishedBy: key, sortUnpublishedReverse: false })
  },

  componentWillMount () {
    loadAllPosts()
  },

  componentWillUnmount () {
    managementState.reset()
  },

  createPosts (posts, published) {
    const loading = this.props.loading && published ? this.props.loadingPublished : this.props.loadingUnpublished
    const sortBy = published ? this.state.sortPublishedBy : this.state.sortUnpublishedBy
    const sortReverse = published ? this.state.sortPublishedReverse : this.state.sortUnpublishedReverse
    const handleSort = published ? this.handlePublishSort : this.handleUnpublishSort

    if (loading) {
      return <Loading />
    } else if (posts ? !posts.length : loading) {
      return <p>Geen {published ? 'gepubliceerde' : 'ongepubliceerde'} posts beschikbaar.</p>
    } else if (posts ? posts.length : false) {
      const postsSorted = sortReverse ? _.reverse(_.sortBy(posts, [sortBy])) : _.sortBy(posts, [sortBy])

      return (
        <Table responsive hover>
          <thead>
            <tr>
              <TableHeader
                keyTable={published}
                keyValue='title'
                label='titel'
                activeSort={sortBy}
                sortReverse={sortReverse}
                onSort={handleSort}
              />
              <TableHeader
                keyTable={published}
                keyValue='createdAt'
                label='gemaakt op'
                activeSort={sortBy}
                sortReverse={sortReverse}
                onSort={handleSort}
                />
              <TableHeader
                keyTable={published}
                keyValue='updatedAt'
                label='laatste update'
                activeSort={sortBy}
                sortReverse={sortReverse}
                onSort={handleSort}
                />
              <th className='actions'>Acties</th>
            </tr>
          </thead>
          <tbody>
            {postsSorted.map(post => {
              return (
                <PostItem
                  key={post.key}
                  keyValue={post.key}
                  post={post}
                  published={published}
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
            <div className='management-toolbar'>
              <Link to='/posts/add' className='btn btn-success'>
                <i className='icon-plus' /> Nieuwe post aanmaken
              </Link>
              <Button bsStyle='primary' className='pull-right' onClick={authLogout}>
                <i className='icon-logout' /> Log uit
              </Button>
            </div>
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
