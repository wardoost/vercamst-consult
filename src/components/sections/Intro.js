import React, {Component} from 'react';
import logo from '../../logo-large.svg';
import './Intro.sass';

export default class Intro extends Component {
  render() {
    return (
      <section id="intro">
        <img src={logo} className="logo" alt="Vercamst Consult" />
      </section>
    )
  }
}
