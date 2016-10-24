import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import VerticalScroller from '../components/VerticalScroller';
import profile from '../../assets/profile.jpg'
import './Who.sass';

export default class Who extends Component {
  render() {
    return (
      <section id="wie">
        <Grid>
          <Row>
            <Col md={12}>
              <h1>Aangename kennismaking!</h1>
            </Col>
          </Row>
          <Row className="row-profile">
            <Col sm={4} className="profile-pic">
              <img src={profile} alt="Jan Vercamst" />
            </Col>
            <Col sm={8} className="profile-txt">
              <ul>
                <li>Jan Vercamst geboren op 23 mei 1954</li>
                <li>Zaakvoerder van BVBA Vercamst Consult, opgericht op 2 juni 2016</li>
                <li>
                  Loopbaan:
                  <ul>
                    <li>RVA : 1975 – 1978</li>
                    <li>
                      ACLVB: vanaf 25/07/1978
                      <ul>
                        <li>Juridische dienst : 1978-1986</li>
                        <li>Bestendig Secretaris West-Vlaanderen : 1986 – 1989</li>
                        <li>Vlaams Gewestsecretaris : 1989 – 2007</li>
                        <li>Nationaal Voorzitter : 13.01.2007 – 24.10.2015</li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </Col>
          </Row>
          <Row className="row-mandates">
            <Col sm={5}>
              <h2 className="text-center">Huidige functies of mandaten</h2>
              <ul className="list-group text-center">
                <li className="list-group-item">
                  <p className="list-group-item-heading">Universiteit Gent</p>
                  <p className="list-group-item-text text-muted">Beheerder</p>
                </li>
                <li className="list-group-item">
                  <p className="list-group-item-heading">Censor NBB sinds 31.03.2008</p>
                  <p className="list-group-item-text text-muted">Secretaris van het college van Censoren sinds 29.06.2016</p>
                </li>
                <li className="list-group-item">
                  <p className="list-group-item-heading">Arbeidshof Brussel</p>
                  <p className="list-group-item-text text-muted">Raadsheer</p>
                </li>
              </ul>
            </Col>
            <Col sm={7}>
              <h2 className="text-center">Verstreken functies of mandaten</h2>
              <VerticalScroller label="Toon meer mandaten">
                <ul className="list-group text-center">
                  <li className="list-group-item">
                    <p className="list-group-item-heading">Belgische Vereniging voor Arbeidsverhoudingen (BVVA) </p>
                    <p className="list-group-item-text text-muted">Bestuurder</p>
                  </li>
                  <li className="list-group-item">
                    <p className="list-group-item-heading">Centrale Raad voor het Bedrijfsleven (CRB) </p>
                    <p className="list-group-item-text text-muted">Werkend lid</p>
                  </li>
                  <li className="list-group-item">
                    <p className="list-group-item-heading">Centre international de Recherches et d'Information sur l'Economie publique, sociale et coopérative (CIRIEC)</p>
                    <p className="list-group-item-text text-muted">Bestuurder</p>
                  </li>
                  <li className="list-group-item">
                    <p className="list-group-item-heading">Commissie tot Regeling der Prijzen </p>
                    <p className="list-group-item-text text-muted">Plaatsvervangend lid</p>
                  </li>
                  <li className="list-group-item">
                    <p className="list-group-item-heading">Commissie voor de Regulering van de Elektriciteit en het Gas (CREG)</p>
                    <p className="list-group-item-text text-muted"> Effectief lid van de Algemene Raad</p>
                  </li>
                  <li className="list-group-item">
                    <p className="list-group-item-heading">Economische Raad voor Oost-Vlaanderen (EROV)</p>
                    <p className="list-group-item-text text-muted"> Lid van de Raad van Bestuur</p>
                  </li>
                  <li className="list-group-item">
                    <p className="list-group-item-heading">Europese Confederatie van Vakverenigingen (EVV)</p>
                    <p className="list-group-item-text text-muted"> Lid Executive Committee</p>
                  </li>
                  <li className="list-group-item">
                    <p className="list-group-item-heading">Groep van 10</p>
                    <p className="list-group-item-text text-muted">Lid</p>
                  </li>
                  <li className="list-group-item">
                    <p className="list-group-item-heading">Hoge Raad voor de Statistiek </p>
                    <p className="list-group-item-text text-muted">Plaatsvervangend lid</p>
                  </li>
                  <li className="list-group-item">
                    <p className="list-group-item-heading">Indexcommissie</p>
                    <p className="list-group-item-text text-muted"> Plaatsvervangend lid</p>
                  </li>
                  <li className="list-group-item">
                    <p className="list-group-item-heading">International Labour Organization (ILO)</p>
                    <p className="list-group-item-text text-muted">Technisch adviseur</p>
                  </li>
                  <li className="list-group-item">
                    <p className="list-group-item-heading">International Trade Union Confederation (ITUC)</p>
                    <p className="list-group-item-text text-muted">Lid Executive Committee</p>
                  </li>
                  <li className="list-group-item">
                    <p className="list-group-item-heading">Koninklijk Instituut der Eliten van de Arbeid </p>
                    <p className="list-group-item-text text-muted">Bestuurslid</p>
                  </li>
                  <li className="list-group-item">
                    <p className="list-group-item-heading">Nationale Arbeidsraad (NAR)</p>
                    <p className="list-group-item-text text-muted">Effectief lid</p>
                  </li>
                  <li className="list-group-item">
                    <p className="list-group-item-heading">Raadgevend comité voor de telecommunicatie</p>
                    <p className="list-group-item-text text-muted">Effectief lid</p>
                  </li>
                  <li className="list-group-item">
                    <p className="list-group-item-heading">Raad voor het Verbruik</p>
                    <p className="list-group-item-text text-muted">Plaatsvervangend lid</p>
                  </li>
                  <li className="list-group-item">
                    <p className="list-group-item-heading">Milieu- en Natuurraad van Vlaanderen (MINA-raad)</p>
                  </li>
                  <li className="list-group-item">
                    <p className="list-group-item-heading">Sociaal-Economische Raad van Vlaanderen (SERV)</p>
                    <p className="list-group-item-text text-muted">Dagelijks bestuur</p>
                  </li>
                  <li className="list-group-item">
                    <p className="list-group-item-heading">Universitair Ziekenhuis Gent</p>
                    <p className="list-group-item-text text-muted">Beheerder</p>
                  </li>
                  <li className="list-group-item">
                    <p className="list-group-item-heading">Vlaamse Commissie voor Ruimtelijke Ordening (VLACORO)</p>
                  </li>
                  <li className="list-group-item">
                    <p className="list-group-item-heading">Vlaams Economisch Sociaal Overlegcomité (VESOC)</p>
                  </li>
                  <li className="list-group-item">
                    <p className="list-group-item-heading">Vlaamse Dienst voor Arbeidsbemiddeling en Beroepsopleiding (VDAB)</p>
                    <p className="list-group-item-text text-muted">Beheerder</p>
                  </li>
                </ul>
              </VerticalScroller>
            </Col>
          </Row>
        </Grid>
      </section>
    )
  }
}