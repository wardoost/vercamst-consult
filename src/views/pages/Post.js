import React, {Component} from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import {scroller} from 'react-scroll';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
import {fetchPost} from '../../core/post/actions';
import Footer from '../components/Footer';
import './Post.sass';

moment.locale('nl');

class Post extends Component {
  scrollToContent() {
    scroller.scrollTo("post-top", {
      smooth: true,
      duration: 500
    });
  }
  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }
  render() {
    if (this.props.post) {
      return (
        <main className="post">
          <div className="splash-container">
            <div className="splash">
              <header className="post-header">
                <Grid>
                  <Row>
                    <Col md={12}>
                      <h1>{this.props.post.title}</h1>
                      <p className="text-muted">Gepost op {moment(this.props.post.createdAt).format("dddd D MMMM YYYY")}</p>
                    </Col>
                  </Row>
                </Grid>
              </header>
            </div>
          </div>
          <div className="content-container invert-sections" id="post-top">
            <Button onClick={this.scrollToContent} className="btn-show-content">
              <i className="fa fa-angle-double-down" />
            </Button>
            <section className="post-content">
              <Grid>
                <Row>
                  <Col md={12}>
                    <div className="post-body" dangerouslySetInnerHTML={{__html: this.props.post.body}} />
                  </Col>
                </Row>
              </Grid>
            </section>
            <Footer />
          </div>
        </main>
      )
    } else {
      return (
        <main className="content-container post-loading">
          <p>Loading post...</p>
        </main>
      )
    }
  }
}

const mapStateToProps = (store) => {
  return store.post;
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchPost: fetchPost}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Post);
