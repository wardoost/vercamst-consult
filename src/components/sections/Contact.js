import React, {Component} from 'react';
import {Button, Grid, Row, Col} from 'react-bootstrap';
import isTouchDevice from '../../utils/isTouchDevice';
import './Contact.sass';

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      touch: isTouchDevice() ? " always-show" : ""
    }
  }
  render() {
    return (
      <section id="contact">
        <Grid>
          <Row className="content">
            <Col sm={4} className="col-btn contact-item">
              <i className="fa fa-map-signs"></i>
              <address>
                Gansbeekstraat 22A<br />
                9680 Maarkedal
              </address>
              <div className={"action" + this.state.touch}>
                <Button href="https://www.google.be/maps/place/Gansbeekstraat+22,+9680+Maarkedal/@50.8176939,3.6349102,17z/data=!3m1!4b1!4m5!3m4!1s0x47c30fb85589e86f:0x6e8230e160043fa7!8m2!3d50.8176939!4d3.6370989" target="_blank">Toon op kaart</Button>
              </div>
            </Col>
            <Col sm={4} className="col-btn contact-item">
              <i className="fa fa-envelope"></i>
              <p>jan@vercamstconsult.be<br /><br /></p>
              <div className={"action" + this.state.touch}>
                <Button href="mailto:jan@vercamstconsult.be">Stuur me een email</Button>
              </div>
            </Col>
            <Col sm={4} className="col-btn contact-item">
              <i className="fa fa-phone"></i>
              <p>+32 (0) 475 47 87 23<br /><br /></p>
              <div className={"action" + this.state.touch}>
                <Button href="tel:+32475478723">Bel mij</Button>
              </div>
            </Col>
          </Row>
        </Grid>
      </section>
    )
  }
}
