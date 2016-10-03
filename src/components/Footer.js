import React, {Component} from 'react';
import './Footer.sass';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <p>
            <a href="https://wardoost.online" target="_blank">Made by Ward</a>
          </p>
        </div>
      </footer>
    );
  }
}