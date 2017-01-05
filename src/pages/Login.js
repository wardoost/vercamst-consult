import { Component, Actions } from 'jumpsuit'
import { Grid, Row, Col, Form, FormGroup, FormControl, Button, Alert } from 'react-bootstrap'
import loginState from '../state/login'
import SplashPage from '../components/SplashPage'
import Footer from '../components/Footer'
import './Login.sass'

export default Component({
  handleSubmit (e) {
    e.preventDefault()

    Actions.submitLogin({
      email: this.props.email,
      password: this.props.password
    })
  },

  render () {
    return (
      <SplashPage
        className='login'
        title='Login'
        splashHeight={0.3}>
        <main className='login-content'>
          { this.props.error && this.props.showAlert
          ? <Alert bsStyle='danger' onDismiss={loginState.dismissAlert}>
            <div className='container'>
              {this.props.error.message}
            </div>
          </Alert>
          : null }
          <Grid>
            <Row>
              <Col sm={6} md={4}>
                <Form onSubmit={this.handleSubmit} className='login-form'>
                  <FormGroup>
                    <FormControl
                      type='email'
                      placeholder='Email'
                      value={this.props.email}
                      onChange={(e) => loginState.updateEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControl
                      type='password'
                      placeholder='Password'
                      value={this.props.password}
                      onChange={(e) => loginState.updatePassword(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button type='submit' bsStyle='primary' disabled={this.props.loading}>
                      Log in
                      {this.props.loading ? <i className='icon-circle-notch icon-spin' /> : null }
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
}, state => {
  return {
    ...state.login
  }
})
