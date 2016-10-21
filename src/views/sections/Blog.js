import React, {Component} from 'react';
import {Grid, Row, Col, Clearfix, Button} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
import {fetchPosts} from '../../core/posts/actions';
import ColButton from '../components/ColButton';
import mapObject from '../../core/utils/mapObject';
import './Blog.sass';

moment.locale('nl');

class Blog extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }
  checkCreateClearfix(i) {
    if (i%2 === 0) {
      return (
        <Clearfix visibleSmBlock key={"cf-" + i}/>
      )
    } else if (i%3 === 0) {
      return (
        <Clearfix visibleMdBlock visibleLgBlock key={"cf-" + i}/>
      )
    }
  }
  createPosts() {
    if (this.props.posts) {
      let counter = 0;

      return mapObject(this.props.posts, (key, post) => {
        const humanDate = moment(post.createdAt).format("dddd D MMMM YYYY");
        counter++;

        return ([
          <ColButton sm={6} md={4} className="article" key={key} to={"posts/" + key} action="Lees meer" >
            <h2>{post.title}</h2>
            {post.createdAt ? <p className="text-muted">{humanDate}</p> : null}
            <div className="summary">
              <p>{post.body}</p>
            </div>
          </ColButton>,
          this.checkCreateClearfix(counter)
        ])
      })
    } else {
      return <p>Loading posts...</p>
    }
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
            {this.createPosts()}
          </Row>
          <Row>
            <Col md={12} className="text-center">
              <Button className="show-more" bsStyle="primary">Toon meer</Button>
            </Col>
          </Row>
        </Grid>
      </section>
    )
  }
}

const mapStateToProps = (store) => {
  return store.posts;
}

const matchDispatchToProps = (dispatch) =>{
  return bindActionCreators({fetchPosts: fetchPosts}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Blog);
