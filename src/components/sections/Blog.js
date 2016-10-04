import React, {Component} from 'react';
import {Button, Grid, Row, Col, Clearfix} from 'react-bootstrap';
import loremIpsum from 'lorem-ipsum';
import moment from 'moment';
import ColButton from '../ui/ColButton';
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
        <ColButton sm={6} md={4} className="article" onClick={this.goToArticle.bind(this, key)} key={key.id} action="Lees meer" >
          <h2>{loremIpsum({count: 5, units: 'words'})}</h2>
          <p className="text-muted">{date}</p>
          <div className="summary">
            <p>{loremIpsum({count: 5})}</p>
          </div>
        </ColButton>
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
          <Row>
            <Col md={12} className="text-center">
              <Button bsStyle="primary" className="show-more">Show more</Button>
            </Col>
          </Row>
        </Grid>
      </section>
    )
  }
}
