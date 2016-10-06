import React, {Component} from 'react';
import Footer from '../Footer';
import Contact from '../sections/Contact';
import './Post.sass';

export default class Posts extends Component {
  render() {
    return (
      <main className={"content-container post"}>
        <div className="post-content">
          <h1>Post</h1>
        </div>
        <Contact />
        <Footer />
      </main>
    )
  }
}
