import { Component } from 'jumpsuit'
import { Grid, Row, Col, Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import moment from 'moment'
import editPostState, { loadPost, savePost } from '../state/editPost'
import SplashPage from '../components/SplashPage'
import Footer from '../components/Footer'
import Editor from '../components/Editor'
import Loading from '../components/Loading'
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

    savePost(this.props.params.id, post)
  },

  componentWillMount () {
    loadPost(this.props.params.id)
  },

  componentWillUnmount () {
    editPostState.unload()
  },

  render () {
    if (this.props.loading && !this.props.post) {
      return (
        <Loading fullPage />
      )
    } else {
      return (
        <SplashPage
          className='add-post'
          title={this.props.title || 'Titel'}
          subTitle={'Gepost op ' + moment(this.props.createdAt).format('dddd D MMMM YYYY')}
          splashHeight={0.3}>
          <main className='edit-post-content'>
            <Grid>
              <Row>
                <Col md={12}>
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <FormControl
                        type='text'
                        placeholder='Titel'
                        value={this.props.title}
                        onChange={(e) => editPostState.updateTitle(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Editor
                        ref='editor'
                        value={this.props.body}
                        onChange={(e) => editPostState.updateBody(e)}
                      />
                    </FormGroup>
                    <Button type='submit' bsStyle='primary' disabled={this.props.loading}>
                      Wijzigingen opslaan {this.props.loading ? <i className='icon-circle-notch icon-spin' /> : null }
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
  }
}, state => {
  return {
    ...state.editPost
  }
})
