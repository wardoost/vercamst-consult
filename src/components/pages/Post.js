import React, {Component} from 'react';
import {Link} from 'react-router';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import {scroller} from 'react-scroll';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchPost} from '../../redux/actions/post';
import moment from 'moment';
import Footer from '../ui/Footer';
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
    this.props.fetchPost(this.props.params.slug);
  }
  render() {
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
                  <Link to="/#blog" className="btn btn-primary">
                    <i className="fa fa-angle-double-left" aria-hidden="true"></i>&nbsp;&nbsp;Terug naar overzicht
                  </Link>
                </Col>
              </Row>
            </Grid>
          </section>
          <Footer />
        </div>
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
