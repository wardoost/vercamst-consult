import React, {Component} from 'react';
import {Grid, Row, Col, Table} from 'react-bootstrap';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchPosts} from '../../core/posts/actions';
import {deletePost} from '../../core/post/actions';
import mapObject from '../../core/utils/mapObject';
import SplashPage from '../components/SplashPage';
import PostItem from '../components/PostItem';
import './Management.sass';

class Management extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }
  createPosts() {
    return mapObject(this.props.posts, (key, post) => {
      return (
        <PostItem
          key={key}
          id={key}
          post={post}
          deletePost={this.props.deletePost}
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
                {this.props.posts ?
                  <Table striped hover responsive>
                    <thead>
                      <tr>
                        <th>Titel</th>
                        <th>Gemaakt op</th>
                        <th>Acties</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.createPosts()}
                    </tbody>
                  </Table>
                :
                  <p className="text-center">
                    <i className="fa fa-circle-o-notch fa-spin" />
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
  return bindActionCreators({fetchPosts, deletePost}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Management);
