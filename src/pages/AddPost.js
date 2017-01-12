import { Component, Goto } from 'jumpsuit'
import { Grid, Row, Col, Form, FormGroup, FormControl, Button, ButtonToolbar, Alert } from 'react-bootstrap'
import { animateScroll } from 'react-scroll'
import classNames from 'classnames'
import moment from 'moment'
import postState, { addPost } from '../core/state/post'
import SplashPage from '../components/SplashPage'
import Footer from '../components/Footer'
import Editor from '../components/Editor'
import './AddPost.sass'

moment.locale('nl')

export default Component({
  getInitialState () {
    return {
      preview: false
    }
  },

  createPost () {
    return {
      title: this.props.title,
      body: this.props.body.toString('html'),
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    }
  },

  handleSave (e) {
    e.preventDefault()

    addPost(this.createPost())
      .then((url) => Goto('/management'))
  },

  handleSaveAndPublish () {
    if (window.confirm('Je post zal meteen zichtbaar zijn voor bezoekers. Ben je zeker dat je deze post wil publiceren?')) {
      addPost(this.createPost(), true)
        .then((url) => Goto(url))
    }
  },

  handleGoBack () {
    if (this.props.unsavedChanges) {
      if (window.confirm('Deze post is nog niet opgeslaan. Ben je zeker dat je je wijzigingen niet wil opslaan?')) {
        Goto('/management')
      }
    } else {
      Goto('/management')
    }
  },

  handleTogglePreview () {
    const preview = !this.state.preview

    this.setState({
      preview: preview
    })

    animateScroll.scrollToTop({duration: 100})
  },

  componentWillUnmount () {
    postState.reset()
  },

  render () {
    const { loading, showAlert, published, error, unsavedChanges } = this.props
    const { preview } = this.state

    return (
      <SplashPage
        className={classNames('add-post', {'add-post-preview': preview})}
        title={!preview ? 'Een nieuwe post aanmaken' : this.props.title || 'Titel'}
        subTitle={!preview ? '' : 'Gepost op ' + moment().format('dddd D MMMM YYYY')}
        splashHeight={0.3}>
        <main className='add-post-content'>
          { error && showAlert
          ? <Alert bsStyle='danger' onDismiss={() => this.setState({ showAlert: false })}>
            <div className='container'>
              {error.message}
            </div>
          </Alert>
          : null }
          <Grid>
            <Row>
              <Col md={12}>
                {!preview
                ? <Form onSubmit={this.handleSave}>
                  <FormGroup>
                    <FormControl
                      type='text'
                      placeholder='Titel'
                      value={this.props.title}
                      onChange={(e) => postState.updateTitle(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Editor
                      ref='editor'
                      value={this.props.body}
                      onChange={(value) => postState.updateBody(value)}
                    />
                  </FormGroup>
                </Form>
                : <div className='post-body' dangerouslySetInnerHTML={{__html: this.props.body.toString('html')}} />}
              </Col>
            </Row>
          </Grid>
          <div className='add-post-toolbar'>
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
                <Button onClick={this.handleTogglePreview} bsStyle='primary' disabled={!unsavedChanges}>
                  {preview ? <i className='icon-left-open' /> : null} {preview ? 'Bewerken' : 'Voorvertoning'}
                </Button>
                <Button onClick={this.handleSave} bsStyle='primary' disabled={loading || !unsavedChanges}>
                  Post opslaan {loading ? <i className='icon-circle-notch icon-spin' /> : null }
                </Button>
                <Button
                  onClick={this.handleSaveAndPublish}
                  bsStyle={published ? 'warning' : 'success'}
                  disabled={loading || !unsavedChanges}>
                  Post publiceren {loading ? <i className='icon-circle-notch icon-spin' /> : null }
                </Button>
              </ButtonToolbar>
            </Grid>
          </div>
          <Footer />
        </main>
      </SplashPage>
    )
  }
}, state => {
  return {
    ...state.post
  }
})
