import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';
import {Grid, Row, Col, Form, FormGroup, FormControl, Button} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Footer from '../components/Footer';
import {createPost} from '../../core/post/actions';
import './AddPost.sass';

class AddPost extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();

    const post = {
      title: ReactDOM.findDOMNode(this.refs.title).value,
      createdAt: new Date().getTime(),
    }

    this.props.createPost(post);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.post) {
      browserHistory.push('/management')
    }
  }
  render() {
    return (
      <main className="content-container add-post">
        <Grid>
          <Row>
            <Col md={12}>
              <h1>Create new post</h1>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <FormControl
                    type="text"
                    placeholder="Title"
                    ref="title"
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
    )
  }
}

const mapStateToProps = (store) => {
  return store.post;
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({createPost: createPost}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(AddPost);
