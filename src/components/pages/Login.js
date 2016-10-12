import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Form, FormGroup, FormControl, Button, Alert} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {authLogin} from '../../redux/actions/auth';
import Footer from '../ui/Footer';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();

    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;

    this.props.authLogin(email, password);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.uid) {
      browserHistory.push('posts-list')
    }
  }
  render() {
    return (
      <main className="content-container login">
        <Grid>
          { this.props.error ?
            <Row>
              <Col md={12}>
                <Alert bsStyle="danger">
                  <p>{this.props.error.message}</p>
                </Alert>
              </Col>
            </Row>
          : null }
          <Row>
            <Col smOffset={3} sm={6}>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <FormControl type="email" placeholder="Email" ref="email" />
                </FormGroup>
                <FormGroup>
                  <FormControl type="password" placeholder="Password" ref="password" />
                </FormGroup>
                <FormGroup>
                  <Button type="submit" bsStyle="primary">
                    Sign in
                  </Button>
                </FormGroup>
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
  return store.auth;
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({authLogin: authLogin}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);
