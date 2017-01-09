import { Component } from 'jumpsuit'
import { Grid, Row, Col, Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import postState, { createPost } from '../state/post'
import SplashPage from '../components/SplashPage'
import Footer from '../components/Footer'
import Editor from '../components/Editor'
import './AddPost.sass'

export default Component({
  handleSubmit (e) {
    e.preventDefault()

    const post = {
      title: this.props.title,
      body: this.props.body.toString('html'),
      published: false,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    }

    createPost(post)
  },

  componentWillUnmount () {
    postState.reset()
  },

  render () {
    return (
      <SplashPage
        className='add-post'
        title='Een nieuwe post aanmaken'
        splashHeight={0.3}>
        <main className='add-post-content'>
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
                  <Button type='submit' bsStyle='primary' disabled={this.props.loading}>
                    Post aanmaken {this.props.loading ? <i className='icon-circle-notch icon-spin' /> : null }
                  </Button>
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
