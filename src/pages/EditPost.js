import { Component, Goto } from 'jumpsuit'
import { Grid, Row, Col, Form, FormGroup, FormControl, Button, ButtonToolbar, Alert } from 'react-bootstrap'
import moment from 'moment'
import postState, { loadPost, updatePost, publishPost, depublishPost } from '../state/post'
import SplashPage from '../components/SplashPage'
import Footer from '../components/Footer'
import Editor from '../components/Editor'
import Loading from '../components/Loading'
import Error from './Error'
import './EditPost.sass'

moment.locale('nl')

export default Component({
  handleSubmit (e) {
    e.preventDefault()

    const post = {
      title: this.props.title,
      body: this.props.body.toString('html'),
      updatedAt: new Date().getTime()
    }

    updatePost(this.props.params.key, post)
      .then(() => Goto(this.props.published ? `/posts/${this.props.params.key}` : '/management'))
  },

  handleTogglePublish () {
    this.props.published
    ? depublishPost(this.props.params.key, this.props.post)
    : publishPost(this.props.params.key, this.props.post).then((url) => Goto(url))
  },

  componentWillMount () {
    loadPost(this.props.params.key)
  },

  componentWillUnmount () {
    postState.reset()
  },

  render () {
    const { loading, showAlert, published, post, title, body } = this.props

    if (loading && !post) {
      return (
        <Loading label='Loading post...' fullPage />
      )
    } else if (!post) {
      return <Error TypeString='post' />
    } else {
      return (
        <SplashPage
          className='edit-post'
          title={post.title || 'Titel'}
          subTitle={'Gepost op ' + moment(post.createdAt).format('dddd D MMMM YYYY')}
          splashHeight={0.3}>
          <main className='edit-post-content'>
            {!published && showAlert
            ? <Alert bsStyle='warning' onDismiss={postState.dismissAlert}>
              <div className='container'>
                This post is unpublished. Publish this post to show it in your blog.
              </div>
            </Alert>
            : null
            }
            <Grid>
              <Row>
                <Col md={12}>
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <FormControl
                        type='text'
                        placeholder='Titel'
                        value={title}
                        onChange={(e) => postState.updateTitle(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Editor
                        ref='editor'
                        value={body}
                        onChange={(e) => postState.updateBody(e)}
                      />
                    </FormGroup>
                    <ButtonToolbar>
                      <Button
                        onClick={() => Goto('/management')}
                        bsStyle='primary'
                        disabled={loading}>
                        <i className='icon-left-open' />
                      </Button>
                      <Button type='submit' bsStyle='primary' disabled={loading}>
                        Wijzigingen opslaan {loading ? <i className='icon-circle-notch icon-spin' /> : null }
                      </Button>
                      <Button
                        onClick={this.handleTogglePublish}
                        bsStyle={published ? 'warning' : 'success'}
                        disabled={loading}>
                        {published ? 'Depubliceren' : 'Opslaan & publiceren'} {loading ? <i className='icon-circle-notch icon-spin' /> : null }
                      </Button>
                    </ButtonToolbar>
                  </Form>
                </Col>
              </Row>
            </Grid>
            <Footer />
          </main>
        </SplashPage>
      )
    }
  }
}, state => {
  return {
    ...state.post
  }
})
