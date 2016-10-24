import React, {Component} from 'react';
import {Grid, Row, Col, Clearfix, Button} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
import {postsActions} from '../../../../core/posts';
import ColButton from '../../../components/ColButton';
import './Blog.sass';

moment.locale('nl');

class Blog extends Component {
  componentWillMount() {
    this.props.loadPosts();
  }

  componentWillUnmount() {
    this.props.unloadPosts();
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
    const posts = this.props.postList;

    if (this.props.postList.length) {
      return posts.map((post, index) => {
        const {title, body, createdAt} = post,
              humanDate = moment(createdAt).format("dddd D MMMM YYYY"),
              summaryLength = 300,
              strippedBody = body.replace(/\\n/gm, ' ble ').replace(/<(?:.|\n)*?>/gm, ''),
              summary = strippedBody.length > summaryLength ? strippedBody.substring(0, summaryLength) + "..." : strippedBody;

        return ([
          <ColButton sm={6} md={4} className="article" key={post.key} to={"posts/" + post.key} action="Lees meer" >
            <h2>{title}</h2>
            {createdAt ? <p className="text-muted">{humanDate}</p> : null}
            <div className="summary">
              <p>{summary}</p>
            </div>
          </ColButton>,
          this.checkCreateClearfix(index + 1)
        ])
      })
    } else {
      return (
        <p className="text-center">
          <i className="fa fa-circle-o-notch fa-3x fa-spin" />
        </p>
      )
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
  return bindActionCreators({
    loadPosts: postsActions.loadPosts,
    unloadPosts: postsActions.unloadPosts
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Blog);
