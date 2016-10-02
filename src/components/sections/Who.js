import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import loremIpsum from 'lorem-ipsum';
import profile from '../../assets/profile.jpg'
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
          <Row className="row-profile">
            <Col sm={4} className="profile-pic">
              <img src={profile} alt="Jan Vercamst" />
            </Col>
            <Col sm={8} className="profile-txt">
              <h2>{loremIpsum({count: 3, units: "words"})}</h2>
              <p>{loremIpsum({count: 4})}</p>
              <p>{loremIpsum({count: 3})}</p>
              <p>{loremIpsum({count: 1})}</p>
            </Col>
          </Row>
        </Grid>
      </section>
    )
  }
}
