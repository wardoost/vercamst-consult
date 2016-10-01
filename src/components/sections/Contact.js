import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import './Contact.sass';

export default class Contact extends Component {
  render() {
    return (
      <section id="contact">
        <Grid>
          <Row>
            <Col md={12}>
              <h2>Contact</h2>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <address>
                Gansbeekstraat 22A<br />
                9680 Maarkedal<br />
                <a href="tel:+32475478723">+32 (0) 475 47 87 23</a><br />
                <a href="mailto:jan@vercamstconsult.be">jan@vercamstconsult.be</a>
              </address>
            </Col>
          </Row>
        </Grid>
      </section>
    )
  }
}
