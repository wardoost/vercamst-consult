import React, {Component} from 'react';
import {Button, Grid, Row, Col, Clearfix} from 'react-bootstrap';
import loremIpsum from 'lorem-ipsum';
import moment from 'moment';
import './Blog.sass';

export default class Blog extends Component {
  goToArticle(e) {
    console.log("Load article " + e.id);
  }
  generateArticles(amount) {
    let articles = [];
    moment.locale('nl');

    for(var i = 1; i <= amount; i++){
      const date = moment(new Date()).format("dddd D MMMM YYYY"),
            key = { id: i };
      articles.push(
        <Col sm={6} md={4} key={key.id} className="article" onClick={this.goToArticle.bind(this, key)}>
            <h2>{loremIpsum({count: 5, units: 'words'})}</h2>
            <p className="text-muted">{date}</p>
            <div className="summary">
              <p>{loremIpsum({count: 5})}</p>
            </div>
            <div className="read-more">
              <Button onClick={this.goToArticle.bind(this, key)}>Lees meer</Button>
            </div>
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
          <Row className="load-more">
            <Col md={12} className="text-center">
              <Button bsStyle="primary">Show more</Button>
            </Col>
          </Row>
        </Grid>
      </section>
    )
  }
}
