import React, {Component} from 'react';
import {Link} from 'react-router';
import Contact from '../sections/Contact';
import Footer from '../Footer';
import './Error.sass';

export default class Error extends Component {
  render() {
    return (
      <main className="content-container error">
        <div className="content-error">
          <div>
            <h1>Page not found...</h1>
            <p><Link to="/">Go to the homepage</Link></p>
          </div>
        </div>
        <Contact />
        <Footer />
      </main>
    )
  }
}
