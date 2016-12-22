import React, {Component} from 'react';
import Helmet from "react-helmet";
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';
import {Grid, Row, Col, Form, FormGroup, FormControl, Button} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Footer from '../../components/Footer';
import Editor from '../../components/Editor';
import {postActions} from '../../../core/post';
import './style.sass';

class AddPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.editorChange = (value) => this.setState({body: value});
  }

  handleSubmit(e) {
    e.preventDefault();

    const post = {
      title: ReactDOM.findDOMNode(this.refs.title).value,
      body: this.state.body.toString("html"),
      published: false,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    }

    this.props.createPost(post);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.post) {
      browserHistory.push('/management')
    }
  }

  componentWillUnmount() {
    this.props.unloadPost();
  }

  render() {
    return (
      <main className="content-container add-post">
        <Helmet title="Post aanmaken" />
        <Grid>
          <Row>
            <Col md={12}>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <FormControl
                    type="text"
                    placeholder="Titel"
                    ref="title"
                  />
                </FormGroup>
                <FormGroup>
                  <Editor ref="editor" onChange={this.editorChange}/>
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
    )
  }
}

const mapStateToProps = (store) => {
  return store.post
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({...postActions}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(AddPost);
