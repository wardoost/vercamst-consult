import React, {Component} from 'react';
import {Link} from 'react-router';
import {Grid, Row, Col, Clearfix} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchPosts} from '../../redux/actions/posts';
import moment from 'moment';
import ColButton from '../ui/ColButton';
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
    return this.props.posts.map((post, i) => {
      const humanDate = moment(post.createdAt).format("dddd D MMMM YYYY");

      return ([
        <ColButton sm={6} md={4} className="article" key={post.id} to={"posts/" + post.slug} action="Lees meer" >
          <h2>{post.title}</h2>
          <p className="text-muted">{humanDate}</p>
          <div className="summary">
            <p>{post.body}</p>
          </div>
        </ColButton>,
        this.checkCreateClearfix(i + 1)
      ])
    })
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
              <Link to="/posts" className="show-more btn btn-primary">Toon meer</Link>
            </Col>
          </Row>
        </Grid>
      </section>
    )
  }
}

function mapStateToProps(store) {
  return store.posts;
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({fetchPosts: fetchPosts}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Blog);
