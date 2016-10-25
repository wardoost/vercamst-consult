import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
import {postActions} from '../../../core/post';
import SplashPage from '../../components/SplashPage';
import Loading from '../../components/Loading';
import './style.sass';

moment.locale('nl');

class Post extends Component {
  componentWillMount() {
    this.props.loadPost(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.unloadPost();
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
        <Loading fullPage={true} />
      )
    }
  }
}

const mapStateToProps = (store) => {
  return store.post;
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({...postActions}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Post);
