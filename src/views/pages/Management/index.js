import React, {Component} from 'react';
import {Grid, Row, Col, Table, Alert} from 'react-bootstrap';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {managementActions} from '../../../core/management';
import SplashPage from '../../components/SplashPage';
import Loading from '../../components/Loading';
import PostItem from '../../components/PostItem';
import './style.sass';

class Management extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAlert: true
    }

    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
  }

  handleAlertDismiss() {
    this.setState({
      showAlert: false
    })
  }

  componentWillMount() {
    this.props.loadPosts();
  }

  componentWillUnmount() {
    this.props.unloadPosts();
  }

  createPosts() {
    return this.props.posts.map(post => {
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
          { this.props.error && this.state.showAlert ?
            <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
              <p>{this.props.error.message}</p>
            </Alert>
          : null }
          <Grid>
            <Row>
              <Col md={12}>
                {this.props.loading ?
                  <Loading />
                :
                  this.props.posts.length ?
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
                    <p>Geen posts beschikbaar.</p>
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
  return store.management;
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({...managementActions}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Management);
