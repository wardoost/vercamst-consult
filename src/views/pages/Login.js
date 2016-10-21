import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Form, FormGroup, FormControl, Button, Alert} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {authLogin} from '../../core/auth/actions';
import Footer from '../components/Footer';
import './Login.sass';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAlert: true
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();

    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;

    this.props.authLogin(email, password);
  }
  handleAlertDismiss() {
    this.setState({
      showAlert: false
    })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        showAlert: true
      })
    }
    if (nextProps.uid) {
      browserHistory.push('/management')
    }
  }
  render() {
    return (
      <main className="content-container login">
        { this.props.error && this.state.showAlert ?
          <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
            <p>{this.props.error.message}</p>
          </Alert>
        : null }
        <Grid>
          <Row>
            <Col smOffset={3} sm={6}>
              <Form onSubmit={this.handleSubmit} className="login-form">
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
