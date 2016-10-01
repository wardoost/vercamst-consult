import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import loremIpsum from 'lorem-ipsum';
import './Participation.css';

export default class Participation extends Component {
  render() {
    return (
      <section id="werknemersparticipatie">
        <Grid>
          <Row>
            <Col mdOffset={3} md={6}>
              <h2>Werknemersparticipatie</h2>
              <p>{loremIpsum({count: 2})}</p>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <h3>{loremIpsum({count: 3, units: "words"})}</h3>
              <p>{loremIpsum({count: 2})}</p>
              <p>{loremIpsum({count: 7})}</p>
              <p>{loremIpsum({count: 2})}</p>
            </Col>
            <Col md={4}>
              <h3>{loremIpsum({count: 2, units: "words"})}</h3>
              <p>{loremIpsum({count: 6})}</p>
              <p>{loremIpsum({count: 5})}</p>
              <p>{loremIpsum({count: 2})}</p>
            </Col>
            <Col md={4}>
              <h3>{loremIpsum({count: 3, units: "words"})}</h3>
              <p>{loremIpsum({count: 5})}</p>
              <p>{loremIpsum({count: 3})}</p>
              <p>{loremIpsum({count: 2})}</p>
            </Col>
          </Row>
        </Grid>
      </section>
    )
  }
}
