import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import loremIpsum from 'lorem-ipsum';
import './Participation.sass';

export default class Participation extends Component {
  render() {
    return (
      <section id="werknemersparticipatie">
        <Grid>
          <Row>
            <Col mdOffset={3} md={6}>
              <h1>Werknemersparticipatie</h1>
              <p>{loremIpsum({count: 2})}</p>
            </Col>
          </Row>
          <Row className="content">
            <Col md={4}>
              <h2>{loremIpsum({count: 3, units: "words"})}</h2>
              <p>{loremIpsum({count: 3})}</p>
            </Col>
            <Col md={4}>
              <h2>{loremIpsum({count: 2, units: "words"})}</h2>
              <p>{loremIpsum({count: 2})}</p>
            </Col>
            <Col md={4}>
              <h2>{loremIpsum({count: 3, units: "words"})}</h2>
              <p>{loremIpsum({count: 3})}</p>
            </Col>
          </Row>
        </Grid>
      </section>
    )
  }
}
