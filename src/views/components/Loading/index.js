import React, {Component, PropTypes} from 'react';
import Footer from '../Footer';
import './style.sass';

export default class Loading extends Component {
  static propTypes = {
    fullPage: PropTypes.bool
  }

  static defaultProps = {
    fullPage: false
  };

  render() {
    if (this.props.fullPage) {
      return(
        <main className="content-container loading">
          <div className="loading-animation">
            <i className="fa fa-circle-o-notch fa-3x fa-spin" />
          </div>
          <Footer />
        </main>
      )
    } else {
      return(
        <div className="loading">
          <div className="loading-animation">
            <i className="fa fa-circle-o-notch fa-3x fa-spin" />
          </div>
        </div>
      )
    }
  }
}
