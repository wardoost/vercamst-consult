import { Component, Goto } from 'jumpsuit'
import { Grid, Row, Col, Form, FormGroup, FormControl, Button, ButtonToolbar, Alert } from 'react-bootstrap'
import { animateScroll } from 'react-scroll'
import classNames from 'classnames'
import moment from 'moment'
import postState, { loadPost, updatePost, publishPost, depublishPost } from '../core/state/post'
import SplashPage from '../components/SplashPage'
import Footer from '../components/Footer'
import Editor from '../components/Editor'
import Loading from '../components/Loading'
import Error from './Error'
import './EditPost.sass'

moment.locale('nl')

export default Component({
  getInitialState () {
    return {
      preview: false
    }
  },

  createPost () {
    const { editorState, bodyChanged, title } = this.props
    const body = editorState.toString('html')

    if (bodyChanged) postState.updateBody(body)
    return {
      title: title,
      body: body,
      updatedAt: new Date().getTime()
    }
  },

  handleSave (e) {
    e.preventDefault()

    updatePost(this.props.params.key, this.createPost(), this.props.published)
      .then(() => {
        this.setState({ preview: true })
        animateScroll.scrollToTop({duration: 100})
      })
  },

  handleTogglePublish () {
    if (this.props.published) {
      if (window.confirm('Ben je zeker dat je deze post wil depubliceren? Je post zal niet meer zichtbaar zijn op je blog.')) {
        depublishPost(this.props.params.key, this.props.post)
          .then(() => animateScroll.scrollToTop({duration: 100}))
      }
    } else if (this.props.unsavedChanges) {
      if (window.confirm('Ben je zeker dat je deze post wil opslaan en publiceren? Je post is meteen zichtbaar voor bezoekers.')) {
        updatePost(this.props.params.key, this.createPost(), this.props.published)
          .then(() => {
            publishPost(this.props.params.key, this.props.post)
              .then(() => Goto(`/posts/${this.props.params.key}`))
          })
      }
    } else {
      if (window.confirm('Je post zal zichtbaar worden voor bezoekers. Ben je zeker dat je deze post wil publiceren?')) {
        publishPost(this.props.params.key, this.props.post)
          .then(() => Goto(`/posts/${this.props.params.key}`))
      }
    }
  },

  handleTogglePreview () {
    const { editorState } = this.props
    const { preview } = this.state

    if (!preview) postState.updateBody(editorState.toString('html'))
    this.setState({ preview: !preview })
    animateScroll.scrollToTop({duration: 100})
  },

  handleGoBack () {
    if (this.props.unsavedChanges) {
      if (window.confirm('De wijzigingen voor deze post zijn nog niet opgeslaan. Ben je zeker dat je je wijzigingen niet wil opslaan?')) {
        Goto('/management')
      }
    } else {
      Goto('/management')
    }
  },

  componentWillMount () {
    loadPost(this.props.params.key)
  },

  componentWillUnmount () {
    postState.reset()
  },

  render () {
    const { post, loading } = this.props

    if (loading && !post) {
      return <Loading label='Loading post...' fullPage />
    } else if (!loading && !post) {
      return <Error typeString='post' />
    } else {
      const { title, body, published, unsavedChanges, error, showAlert } = this.props
      const { preview } = this.state

      return (
        <SplashPage
          className={classNames('edit-post', {'edit-post-preview': preview})}
          title={`Bewerk ${post.title || 'post'}`}
          subTitle={preview ? 'Gepost op ' + moment(post.createdAt).format('dddd D MMMM YYYY') : null}
          splashHeight={0.3}>
          <main className='edit-post-content'>
            {error && showAlert
            ? <Alert bsStyle='danger' onDismiss={postState.dismissAlert}>
              <div className='container'>
                {error.message}
              </div>
            </Alert>
            : null }
            {!published
            ? <Alert bsStyle='warning'>
              <div className='container'>
                Deze post is niet gepubliceerd en dus niet zichtbaar voor bezoekers. Om deze post op je blog te tonen moet je deze publiceren.
              </div>
            </Alert>
            : null
            }
            <Grid>
              <Row>
                <Col md={12}>
                  {!preview
                  ? <Form onSubmit={this.handleSave}>
                    <FormGroup>
                      <FormControl
                        type='text'
                        placeholder='Titel'
                        value={title}
                        onChange={e => postState.updateTitle(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Editor
                        ref='editor'
                        value={body}
                        onInitialized={value => postState.initEditor(value)}
                        onChange={value => postState.updateEditor(value)}
                      />
                    </FormGroup>
                  </Form>
                  : <div className='post-body' dangerouslySetInnerHTML={{__html: body.toString('html')}} />}
                </Col>
              </Row>
            </Grid>
            <div className='edit-post-toolbar'>
              <Grid>
                <ButtonToolbar>
                  {!preview
                  ? <Button
                    onClick={this.handleGoBack}
                    bsStyle='primary'
                    disabled={loading}>
                    <i className='icon-left-open' />
                  </Button>
                  : null}
                  <Button onClick={this.handleTogglePreview} bsStyle='primary'>
                    {preview ? <i className='icon-left-open' /> : null} {preview ? 'Bewerken' : 'Voorvertoning'}
                  </Button>
                  <Button onClick={this.handleSave} bsStyle='primary' disabled={loading || !unsavedChanges}>
                    Opslaan {loading ? <i className='icon-circle-notch icon-spin' /> : null }
                  </Button>
                  <Button
                    onClick={this.handleTogglePublish}
                    bsStyle={published ? 'warning' : 'success'}
                    disabled={published ? unsavedChanges || loading : loading}>
                    {published ? 'Depubliceren' : unsavedChanges ? 'Opslaan & publiceren' : 'Publiceren'} {loading ? <i className='icon-circle-notch icon-spin' /> : null }
                  </Button>
                </ButtonToolbar>
              </Grid>
            </div>
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
