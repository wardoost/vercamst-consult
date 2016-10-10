import React, {Component} from 'react';
import {Link} from 'react-router';
import {Grid, Row, Col} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchPosts} from '../../redux/actions/posts';
import moment from 'moment';
import Footer from '../ui/Footer';
import mapObject from '../../utils/mapObject';
import './Posts.sass';

moment.locale('nl');

class Posts extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }
  createPosts() {
    if (this.props.fetched) {
      return mapObject(this.props.posts, (key, post) => {
        const humanDate = moment(post.createdAt).format("dddd D MMMM YYYY");

        return (
          <section key={key} className="post">
            <Grid>
              <Row>
                <Col md={12}>
                  <h1>{post.title}</h1>
                  <p className="text-muted"> {humanDate}</p>
                  <p className="list-group-item-text">{post.body}</p>
                  <Link to={"posts/" + key} className="btn btn-primary">Lees meer</Link>
                </Col>
              </Row>
            </Grid>
          </section>
        )
      })
    } else if (this.props.fetching) {
      return <p>Loading posts...</p>
    }
  }
  render() {
    return (
      <main className="content-container invert-sections posts">
        {this.createPosts()}
        <Footer />
      </main>
    )
  }
}

function mapStateToProps(store) {
  return store.posts;
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({fetchPosts: fetchPosts}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Posts);
