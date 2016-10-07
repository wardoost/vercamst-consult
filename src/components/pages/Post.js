import React, {Component} from 'react';
import {Link} from 'react-router';
import {Grid, Row, Col} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchPost} from '../../redux/actions/post';
import moment from 'moment';
import Footer from '../ui/Footer';
import './Post.sass';

class Post extends Component {
  componentWillMount() {
    this.props.fetchPost(this.props.params.slug);
  }
  render() {
    return (
      <main className={"content-container post"}>
        <section className="post-content">
          <Grid>
            <Row>
              <Col md={12}>
                <h1>{this.props.post.title}</h1>
                <p className="text-muted">{moment(this.props.post.createdAt).format("dddd D MMMM YYYY")}</p>
                <p>{this.props.post.body}</p>
                <p><Link to="/#blog">Back to the overview</Link></p>
              </Col>
            </Row>
          </Grid>
        </section>
        <Footer />
      </main>
    )
  }
}

function mapStateToProps(store) {
  return store.post;
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({fetchPost: fetchPost}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Post);
