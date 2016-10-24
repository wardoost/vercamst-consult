import React, {Component} from 'react';
import {Grid, Row, Col, Table} from 'react-bootstrap';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {postsActions} from '../../core/posts';
import SplashPage from '../components/SplashPage';
import PostItem from '../components/PostItem';
import './Management.sass';

class Management extends Component {

  componentWillMount() {
    this.props.loadPosts();
  }

  componentWillUnmount() {
    this.props.unloadPosts();
  }

  createPosts() {
    const posts = this.props.postList;

    return posts.map(post => {
      return (
        <PostItem
          key={post.key}
          post={post}
          deletePost={this.props.deletePost}
          updatePost={this.props.updatePost}
        />
      );
    })
  }
  render() {
    return (
      <SplashPage
        className="management"
        title="Blog beheer"
        splashHeight={0.3}>
        <section className="management-content">
          <Grid>
            <Row>
              <Col md={12}>
                {this.props.postList.length ?
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Titel</th>
                        <th>Gemaakt op</th>
                        <th className="actions">Acties</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.createPosts()}
                    </tbody>
                  </Table>
                :
                  <p className="text-center">
                    <i className="fa fa-circle-o-notch fa-3x fa-spin" />
                  </p>
                }
              </Col>
            </Row>
          </Grid>
        </section>
        <section className="management-actions">
          <Grid>
            <Row>
              <Col md={12}>
                <Link to="/posts/add" className="btn btn-primary">
                  <i className="fa fa-plus" /> Nieuwe post aanmaken
                </Link>
                <Link to="/logout" className="btn btn-primary pull-right">
                  <i className="fa fa-sign-out" /> Log uit
                </Link>
              </Col>
            </Row>
          </Grid>
        </section>
      </SplashPage>
    )
  }
}

const mapStateToProps = (store) => {
  return store.posts;
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadPosts: postsActions.loadPosts,
    unloadPosts: postsActions.unloadPosts,
    deletePost: postsActions.deletePost,
    updatePost: postsActions.updatePost
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Management);
