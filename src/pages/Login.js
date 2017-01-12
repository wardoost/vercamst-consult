import { Component, Goto } from 'jumpsuit'
import { Grid, Row, Col, Form, FormGroup, FormControl, Button, Alert } from 'react-bootstrap'
import classNames from 'classnames'
import { authLogin } from '../core/state/auth'
import SplashPage from '../components/SplashPage'
import Footer from '../components/Footer'
import './Login.sass'

export default Component({
  getInitialState () {
    return {
      email: '',
      password: '',
      error: null,
      showAlert: true,
      loading: false
    }
  },

  handleSubmit (e) {
    e.preventDefault()
    this.setState({ loading: true })

    const {email, password} = this.state
    authLogin(email, password)
      .then(user => Goto('/management'))
      .catch(error => {
        this.setState({
          password: '',
          error: error,
          showAlert: true,
          loading: false
        })
      })
  },

  render () {
    const { email, password, error, showAlert, loading } = this.state

    return (
      <SplashPage
        className='login'
        title='Login'
        splashHeight={0.3}>
        <main className={classNames('login-content', { 'content-alert': error && showAlert })}>
          { error && showAlert
          ? <Alert bsStyle='danger' onDismiss={() => this.setState({ showAlert: false })}>
            <div className='container'>
              {error.message}
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
                      value={email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControl
                      type='password'
                      placeholder='Password'
                      value={password}
                      onChange={(e) => this.setState({ password: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button type='submit' bsStyle='primary' disabled={loading}>
                      Log in {loading ? <i className='icon-circle-notch icon-spin' /> : null }
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
    ...state.auth
  }
})
