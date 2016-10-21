import React, {Component} from 'react';
import {Grid, Row, Col, Table} from 'react-bootstrap';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchPosts} from '../../core/posts/actions';
import {deletePost} from '../../core/post/actions';
import mapObject from '../../core/utils/mapObject';
import Footer from '../components/Footer';
import PostItem from '../components/PostItem';
import './Management.sass';

class Management extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }
  createPosts() {
    if (this.props.posts) {
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
    } else {
      return <p>Loading posts...</p>
    }
  }
  render() {
    return (
      <main className="content-container management">
        <Grid>
          <Row>
            <Col>
              <h1>Post Management</h1>
              {this.props.posts ?
                <Table striped hover>
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
                <p>Loading posts...</p>
              }
              <Link to="/posts/add" className="btn btn-primary">Nieuwe post aanmaken</Link>
              <Link to="/logout" className="btn btn-primary pull-right">Log uit</Link>
            </Col>
          </Row>
        </Grid>
        <Footer />
      </main>
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
