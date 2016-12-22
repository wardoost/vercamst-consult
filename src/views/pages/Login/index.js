import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Form, FormGroup, FormControl, Button, Alert} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SplashPage from '../../components/SplashPage';
import {authActions} from '../../../core/auth';
import Footer from '../../components/Footer';
import './style.sass';

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
      <SplashPage
        className="login"
        title="Login"
        splashHeight={0.3}>
        <main className="login-content">
          { this.props.error && this.state.showAlert ?
            <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
              <div className="container">
                {this.props.error.message}
              </div>
            </Alert>
          : null }
          <Grid>
            <Row>
              <Col sm={6} md={4}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <FormGroup>
                    <FormControl type="email" placeholder="Email" ref="email" />
                  </FormGroup>
                  <FormGroup>
                    <FormControl type="password" placeholder="Password" ref="password" />
                  </FormGroup>
                  <FormGroup>
                    <Button type="submit" bsStyle="primary">
                      Log in
                    </Button>
                  </FormGroup>
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

const mapStateToProps = (store) => {
  return store.auth;
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    authLogin: authActions.authLogin
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);
