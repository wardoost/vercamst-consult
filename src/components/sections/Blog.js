import React, {Component} from 'react';
import {Grid, Row, Col, Clearfix} from 'react-bootstrap';
import loremIpsum from 'lorem-ipsum';
import './Blog.css';

export default class Blog extends Component {

  generateArticles(amount) {
    let articles = [];

    for(var i = 1; i <= amount; i++){
      articles.push(
        <Col sm={6} md={4} key={i}>
          <h3>{loremIpsum({count: 5, units: 'words'})}</h3>
          <p>{loremIpsum({count: 5})}</p>
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
              <h2>Blog</h2>
            </Col>
          </Row>
          <Row>
            {this.generateArticles(6)}
          </Row>
        </Grid>
      </section>
    )
  }
}
