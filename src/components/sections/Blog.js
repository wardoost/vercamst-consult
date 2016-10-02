import React, {Component} from 'react';
import {Button, Grid, Row, Col, Clearfix} from 'react-bootstrap';
import loremIpsum from 'lorem-ipsum';
import './Blog.sass';

export default class Blog extends Component {

  generateArticles(amount) {
    let articles = [];

    for(var i = 1; i <= amount; i++){
      const date = new Date()
      articles.push(
        <Col sm={6} md={4} key={i}>
          <h2>{loremIpsum({count: 5, units: 'words'})}</h2>
          <p className="text-muted">{date.toDateString()}</p>
          <p>{loremIpsum({count: 5})}</p>
          <p><a href="#">Read more</a></p>
        </Col>
      )

      if(i%2 === 0){
        articles.push(
          <Clearfix visibleSmBlock key={"cf-a" + i}/>
        )
      }
      if(i%3 === 0){
        articles.push(
          <Clearfix visibleMdBlock visibleLgBlock key={"cf-b" + i}/>
        )
      }
    }
    return articles
  }

  render() {
    return (
      <section id="blog">
        <Grid>
          <Row>
            <Col md={12}>
              <h1>Blog</h1>
            </Col>
          </Row>
          <Row>
            {this.generateArticles(6)}
          </Row>
          <Row className="more">
            <Col md={12} className="text-center">
              <Button bsStyle="primary">Show more</Button>
            </Col>
          </Row>
        </Grid>
      </section>
    )
  }
}
