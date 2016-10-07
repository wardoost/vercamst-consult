import React, {Component} from 'react';
import {Link} from 'react-router';
import Footer from '../Footer';
import './Post.sass';

export default class Posts extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.location.pathname !== nextProps.location.pathname;
  }
  render() {
    return (
      <main className={"content-container post"}>
        <div className="post-content">
          <div>
            <h1>Post</h1>
            <p><Link to="/#blog">Back to the overview</Link></p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }
}
