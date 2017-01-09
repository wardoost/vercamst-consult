import { Component } from 'jumpsuit'
import { Grid, Row, Col, Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import moment from 'moment'
import postState, { loadPost, savePost } from '../state/post'
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
    postState.unload()
  },

  render () {
    if (this.props.loading && !this.props.post) {
      return (
        <Loading label='Loading post...' fullPage />
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
    ...state.post
  }
})
