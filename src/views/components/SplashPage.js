import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import {scroller} from 'react-scroll';
import classNames from 'classnames';
import Footer from './Footer';
import './SplashPage.sass';

export default class SplashPage extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    splashHeight: PropTypes.number,
    scrollToContent: PropTypes.bool,
  }

  static defaultProps = {
    title: undefined,
    subTitle: undefined,
    splashHeight: 0.5,
    scrollToContent: false,
  };

  scrollToContent() {
    scroller.scrollTo("page-top", {
      smooth: true,
      duration: 500
    });
  }

  render() {
    const styles = {
      container: {
        height: (this.props.splashHeight * 100) + "%",
      },
      content: {
        top: (this.props.splashHeight * 100) + "%",
        minHeight: ((1 - this.props.splashHeight) * 100) + "%",
      }
    }

    return(
      <main className={classNames("splash-page", this.props.className)}>
        <div className="splash-container" style={styles.container}>
          <div className="splash">
            <header className="splash-header">
              <Grid>
                <Row>
                  <Col md={12}>
                    <h1>{this.props.title}</h1>
                    <p className="text-muted">{this.props.subTitle}</p>
                  </Col>
                </Row>
              </Grid>
            </header>
          </div>
        </div>
        <div
          className={classNames("content-container", {"invert-sections": this.props.scrollToContent})}
          style={styles.content}
          id="page-top">
          { this.props.scrollToContent ?
            <Button onClick={this.scrollToContent} className="btn-show-content">
              <i className="fa fa-angle-double-down" />
            </Button>
            :
            null
          }
          {this.props.children}
          <Footer />
        </div>
      </main>
    )
  }
}
