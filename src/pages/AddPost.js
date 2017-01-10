import { Component, Goto } from 'jumpsuit'
import { Grid, Row, Col, Form, FormGroup, FormControl, Button, ButtonToolbar, Alert } from 'react-bootstrap'
import postState, { addPost } from '../state/post'
import SplashPage from '../components/SplashPage'
import Footer from '../components/Footer'
import Editor from '../components/Editor'
import './AddPost.sass'

export default Component({
  createPost () {
    return {
      title: this.props.title,
      body: this.props.body.toString('html'),
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    }
  },

  handleSubmit (e) {
    e.preventDefault()

    addPost(this.createPost()).then((url) => Goto(url))
  },

  handlePublish () {
    addPost(this.createPost(), true).then((url) => Goto(url))
  },

  componentWillUnmount () {
    postState.reset()
  },

  render () {
    const { loading, showAlert, published, error } = this.props

    return (
      <SplashPage
        className='add-post'
        title='Een nieuwe post aanmaken'
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
                <Form onSubmit={this.handleSubmit}>
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
                      Post opslaan {loading ? <i className='icon-circle-notch icon-spin' /> : null }
                    </Button>
                    <Button
                      onClick={this.handlePublish}
                      bsStyle={published ? 'warning' : 'success'}
                      disabled={loading}>
                      Post publiceren {loading ? <i className='icon-circle-notch icon-spin' /> : null }
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
}, state => {
  return {
    ...state.post
  }
})
