import React, {Component} from 'react';
import {Button, Grid, Row, Col} from 'react-bootstrap';
import './Contact.sass';

export default class Contact extends Component {
  render() {
    return (
      <section id="contact">
        <Grid>
          <Row>
            <Col md={12}>
              <h1>Contact</h1>
            </Col>
          </Row>
          <Row className="content">
            <Col sm={4}>
              <address>
                Gansbeekstraat 22A<br />
                9680 Maarkedal
              </address>
              <Button bsStyle="primary" bsSize="large" href="https://www.google.be/maps/place/Gansbeekstraat+22,+9680+Maarkedal/@50.8176939,3.6349102,17z/data=!3m1!4b1!4m5!3m4!1s0x47c30fb85589e86f:0x6e8230e160043fa7!8m2!3d50.8176939!4d3.6370989" target="_blank">Show on maps</Button>
            </Col>
            <Col sm={4}>
              <p>jan@vercamstconsult.be</p>
              <Button bsStyle="primary" bsSize="large" href="mailto:jan@vercamstconsult.be">Mail</Button>
            </Col>
            <Col sm={4}>
              <p>+32 (0) 475 47 87 23</p>
              <Button bsStyle="primary" bsSize="large" href="tel:+32475478723">Call</Button>
            </Col>
          </Row>
        </Grid>
      </section>
    )
  }
}
