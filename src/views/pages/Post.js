import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
import {fetchPost} from '../../core/post/actions';
import SplashPage from '../components/SplashPage';
import './Post.sass';

moment.locale('nl');

class Post extends Component {
  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }
  render() {
    if (this.props.post) {
      const {title, createdAt, body} = this.props.post;

      return (
        <SplashPage
          className="post"
          title={title}
          subTitle={"Gepost op " + moment(createdAt).format("dddd D MMMM YYYY")}
          splashHeight={0.4}
          scrollToContent={true}>
          <section className="post-content">
            <Grid>
              <Row>
                <Col md={12}>
                  <div className="post-body" dangerouslySetInnerHTML={{__html: body}} />
                </Col>
              </Row>
            </Grid>
          </section>
        </SplashPage>
      )
    } else {
      return (
        <main className="content-container loading">
          <p className="text-center">
            <i className="fa fa-circle-o-notch fa-spin" />
          </p>
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
