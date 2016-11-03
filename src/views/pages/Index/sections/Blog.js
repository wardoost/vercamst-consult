import React, {Component} from 'react';
import {Grid, Row, Col, Clearfix, Button} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
import {blogActions} from '../../../../core/blog';
import ColButton from '../../../components/ColButton';
import Loading from '../../../components/Loading';
import './Blog.sass';

moment.locale('nl');

class Blog extends Component {
  componentWillMount() {
    this.props.loadPublishedPosts();
  }

  componentWillUnmount() {
    this.props.unloadPublishedPosts();
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
    return this.props.posts.map((post, index) => {
      const {title, body, createdAt} = post,
            humanDate = moment(createdAt).format('dddd D MMMM YYYY'),
            summaryLength = 300,
            strippedBody = body.replace(/\n/gm, ' ').replace(/<(?:.|\n)*?>/gm, ''),
            summary = strippedBody.length > summaryLength ? strippedBody.substring(0, summaryLength) + "..." : strippedBody;

      return ([
        <ColButton sm={6} md={4} className="article" key={post.key} to={"/posts/" + post.key} action="Lees meer" >
          <h2>{title}</h2>
          {createdAt ? <p className="text-muted">{humanDate}</p> : null}
          <div className="summary">
            <p>{summary}</p>
          </div>
        </ColButton>,
        this.checkCreateClearfix(index + 1)
      ])
    })
  }

  render() {
    return (
      <section id="blog">
        <Grid>
          {!this.props.loading && !this.props.posts.length ?
            null
            :
            <Row>
              <Col md={12}>
                <h1>Blog</h1>
              </Col>
            </Row>
          }
          <Row>
            {this.props.loading ?
              <Col md={12}>
                <Loading />
              </Col>
            :
              this.createPosts()
            }
          </Row>
          {!this.props.onLastPage ?
            <Row>
              <Col md={12} className="text-center">
                <Button className="show-more" bsStyle="primary" onClick={this.props.loadMorePublishedPosts}>Toon meer</Button>
              </Col>
            </Row>
          :
            null
          }
        </Grid>
      </section>
    )
  }
}

const mapStateToProps = (store) => {
  return store.blog;
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({...blogActions}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Blog);
