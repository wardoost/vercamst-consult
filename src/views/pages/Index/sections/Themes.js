import React from 'react'
import { Component } from 'jumpsuit'
import {Grid, Row, Col} from 'react-bootstrap'
import './Themes.sass'

export default Component({
  render() {
    return (
      <section id="themas">
        <Grid>
          <Row>
            <Col mdOffset={3} md={6}>
              <h1>Thema's</h1>
              <ul className="list-group">
                <li className="list-group-item">Samenwerkingsmodellen voor ondernemingen en instellingen</li>
                <li className="list-group-item">Evoluerende arbeidsorganisatie in tijden van digitalisering</li>
                <li className="list-group-item">Sociale conflicten</li>
                <li className="list-group-item">Werknemersparticipatie – ondernemerschapparticipatie: een toekomst voor beter ondernemen</li>
                <li className="list-group-item">Optimaliseren samenwerkingsverbanden tussen werkgevers en werknemers</li>
              </ul>
            </Col>
          </Row>
        </Grid>
      </section>
    )
  }
})
