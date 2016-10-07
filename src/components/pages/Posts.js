import React, {Component} from 'react';
import {Link} from 'react-router';
import Footer from '../ui/Footer';
import './Posts.sass';

export default class Posts extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.location.pathname !== nextProps.location.pathname;
  }
  render() {
    return (
      <main className={"content-container post"}>
        <section className="post-content">
          <div>
            <h1>Posts</h1>
            <p><Link to="/#blog">Back to the overview</Link></p>
          </div>
        </section>
        <Footer />
      </main>
    )
  }
}
