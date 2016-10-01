import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import loremIpsum from 'lorem-ipsum';
import './Who.sass';

export default class Who extends Component {
  render() {
    return (
      <section id="wie">
        <Grid>
          <Row>
            <Col md={12}>
              <h1>Wie zijn wij?</h1>
              <p>{loremIpsum({count: 2})}</p>
              <blockquote>
                <p>{loremIpsum({count: 1})}</p>
              </blockquote>
              <p>{loremIpsum({count: 5})}</p>
              <p>{loremIpsum({count: 1})}</p>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>{loremIpsum({count: 2, units: "words"})}</h2>
              <p>{loremIpsum({count: 1})}</p>
              <p>{loremIpsum({count: 4})}</p>
            </Col>
            <Col md={6}>
              <h2>{loremIpsum({count: 3, units: "words"})}</h2>
              <p>{loremIpsum({count: 2})}</p>
            </Col>
          </Row>
        </Grid>
      </section>
    )
  }
}
