import React, {Component} from 'react';
import './style.sass';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <p>
            <a href="https://wardoost.online" target="_blank" title="Website made by Ward Oosterlijnck">
              <i className="icon-code" /> by Ward
            </a>
          </p>
        </div>
      </footer>
    );
  }
}
