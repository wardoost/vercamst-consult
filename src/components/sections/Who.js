import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import loremIpsum from 'lorem-ipsum';
import './Who.css';

export default class Who extends Component {
  render() {
    return (
      <section id="wie">
        <Grid>
          <Row>
            <Col md={12}>
              <h2>Wie zijn wij?</h2>
              <p>{loremIpsum({count: 15})}</p>
              <p>{loremIpsum({count: 13})}</p>
              <p>{loremIpsum({count: 16})}</p>
            </Col>
          </Row>
        </Grid>
      </section>
    )
  }
}
