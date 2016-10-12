import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Footer from '../ui/Footer';

export default class PostsList extends Component {
  render() {
    return (
      <main className="content-container posts-list">
        <Grid>
          <Row>
            <Col>
              <h1>Posts list</h1>
              <p>This page should only be reachable when logged in.</p>
            </Col>
          </Row>
        </Grid>
        <Footer />
      </main>
    )
  }
}
