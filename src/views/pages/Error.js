import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import Footer from '../components/Footer';
import './Error.sass';

export default class Error extends Component {
  goBack(e) {
    e.preventDefault();

    browserHistory.goBack();
  }
  render() {
    return (
      <main className="content-container error">
        <div className="content-error">
          <div>
            <h1>Page not found...</h1>
            <p>You can go <a onClick={this.goBack}>back</a> or to the <Link to="/">homepage</Link></p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }
}
