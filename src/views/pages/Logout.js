import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {authActions} from '../../core/auth';
import Footer from '../components/Footer';

class Logout extends Component {
  componentWillMount () {
    this.props.authLogout();
    browserHistory.push('/')
  }
  render() {
    return (
      <main className="content-container logout">
        <Grid>
          <Row>
            <Col smOffset={3} sm={6}>
              <p>Logging out...</p>
            </Col>
          </Row>
        </Grid>
        <Footer />
      </main>
    )
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    authLogout: authActions.authLogout
  }, dispatch)
}

export default connect(null, matchDispatchToProps)(Logout);
