import React, {Component} from 'react';
import {Grid, Row} from 'react-bootstrap';
import ColButton from '../../../components/ColButton';
import './Contact.sass';

export default class Contact extends Component {
  render() {
    return (
      <section id="contact">
        <Grid>
          <Row>
            <ColButton sm={4} className="contact-item" action="Toon op kaart" to="https://www.google.be/maps/place/Gansbeekstraat+22,+9680+Maarkedal/@50.8176939,3.6349102,17z/data=!3m1!4b1!4m5!3m4!1s0x47c30fb85589e86f:0x6e8230e160043fa7!8m2!3d50.8176939!4d3.6370989" bsSize="large">
              <i className="icon-map-signs"></i>
              <address className="description">
                <span>
                  BVBA Vercamst Consult<br />
                  Gansbeekstraat 22A<br />
                  9680 Maarkedal
                </span>
              </address>
            </ColButton>
            <ColButton sm={4} className="contact-item" action="Stuur me een email" to="mailto:jan@vercamstconsult.be" bsSize="large">
              <i className="icon-mail-alt"></i>
              <div className="description">
                <span>jan@vercamstconsult.be</span>
              </div>
            </ColButton>
            <ColButton sm={4} className="contact-item" action="Bel mij" to="tel:+32475478723" bsSize="large">
              <i className="icon-phone"></i>
              <div className="description">
                <span>+32 (0) 475 47 87 23</span>
              </div>
            </ColButton>
          </Row>
        </Grid>
      </section>
    )
  }
}
