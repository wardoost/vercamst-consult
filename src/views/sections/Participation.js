import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import './Participation.sass';

export default class Participation extends Component {
  render() {
    return (
      <section id="werknemersparticipatie">
        <Grid>
          <Row>
            <Col mdOffset={3} md={6}>
              <h1>Werknemersparticipatie</h1>
              <h2>De juiste weg naar Sociale Innovatie</h2>
              <p>Prestaties van ondernemingen verbeteren indien er voldoende geïnvesteerd wordt in de talenten van mensen. Goed opgeleide en gemotiveerde werknemers zullen hun bedrijf in staat stellen om voldoende toegevoegde waarde te creëren, noodzakelijk voor stabiliteit en sociaal-economische zekerheid op middellange termijn.</p>
              <p>Belangen van ondernemingen en werknemers gaan hand in hand. Ondernemingen profiteren van verhoogde productiviteit, sterkere innovatie en grotere flexibiliteit van werknemers. Werknemers genieten van meer inspraak, betere balans werk-privé met meer opleidingsmogelijkheden en een betere werksfeer. Werkgevers moeten om dit ganse proces te laten slagen, voldoende ruimte geven aan werknemers om nieuwe ideeën te ontwikkelen. Een goede samenwerking en arbeidsverhouding tussen werkgever en werknemer is hierbij primordiaal. De vierpoot van Sociale Innovatie kan gedefinieerd worden door een soepelere werkorganisatie, slimmer managen, co-creatie en wendbaar werken.</p>
              <ul>
                <li>Soepelere werkorganisatie gaat over zich openstellen voor nieuwe ideeën voor ontwikkeling van producten en diensten. Rigide structuren of processen moeten de baan ruimen voor een efficiëntere overlegde organisatievorm (samenspraak werkgever en werknemers).</li>
                <li>Slimmer managen: werkgever of leidinggevenden moeten meer aandacht besteden aan betrokkenheid, relaties met werknemers om hun motivatie nog te verhogen. Het vergroten van autonomie mondt uit in betere prestaties, grotere tevredenheid waardoor een groter innovatievermogen wordt ontwikkeld.</li>
                <li>Co-creatie zorgt voor een betere samenwerking met externe partijen (overheden, ondernemingen en organisaties) waardoor meer kennis wordt uitgewisseld.</li>
                <li>wendbaar werken veronderstelt een betere ontwikkeling van talent van de werknemer via het realiseren van hoogwaardige arbeidsrelaties (werknemersparticipatie) waardoor de kwaliteit van de arbeid aanzienlijk verhoogt en de werknemer beter inzetbaar wordt.</li>
              </ul>
              <p>Initiatieven in het kader van Sociale Innovatie komen vooral voort uit een goede relatie tussen werknemer en werkgever. Het startpunt om met Sociale Innovatie te beginnen is het vastleggen van een nulmeting (hetgeen wat er vandaag al bestaat in de onderneming op vlak van S.I.).</p>
            </Col>
          </Row>
        </Grid>
      </section>
    )
  }
}
