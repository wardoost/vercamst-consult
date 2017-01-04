import React from 'react'
import { Component, Goto } from 'jumpsuit'
import {Grid, Row, Col, Form, FormGroup, FormControl, Button} from 'react-bootstrap';
import addPostState, { createPost } from '../../../state/addPost'
import SplashPage from '../../components/SplashPage';
import Footer from '../../components/Footer';
import Editor from '../../components/Editor';
import './style.sass';

export default Component({
  handleSubmit(e) {
    e.preventDefault();

    const post = {
      title: this.props.title,
      body: this.props.body.toString("html"),
      published: false,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    }

    createPost(post);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.post) {
      Goto('/management');
    }
  },

  componentWillUnmount() {
    addPostState.unload();
  },

  render() {
    return (
      <SplashPage
        className="add-post"
        title="Een nieuwe post aanmaken"
        splashHeight={0.3}>
        <main className="add-post-content">
          <Grid>
            <Row>
              <Col md={12}>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <FormControl
                      type="text"
                      placeholder="Titel"
                      value={this.props.title}
                      onChange={(e) => addPostState.updateTitle(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Editor
                      ref="editor"
                      value={this.props.body}
                      onChange={(e) => addPostState.updateBody(e)}
                    />
                  </FormGroup>
                  <Button type="submit" bsStyle="primary">
                    Post aanmaken
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
    ...state.addPost,
  }
})
