import React, {Component} from 'react';
import Helmet from "react-helmet";
import Navigation from '../Navigation';
import 'bootstrap/dist/css/bootstrap.css';
import './style.sass';
import './icons.css';

export default class Layout extends Component {
  render() {
    return (
      <div className="main" id="top">
        <Helmet
          titleTemplate="%s | Vercamst Consult"
          titleAttributes={{itemprop: "name", lang: "en"}}
          base={{target: "_blank", href: window.location.origin}}
          meta={[
              {name: "description", content: "Op 2/6/2016 richtte Jan een BVBA Vercamst Consult op die zich vooral toespitst op onderwerpen zoals werknemersparticipatie, samenwerkingsmodellen en businessmodellen in disruptieve omgevingen."},
              {property: "og:type", content: "website"}
          ]}
          link={[
              {rel: "canonical", href: window.location.href},
          ]}
        />
        <Navigation location={this.props.location} logoScrollLink={this.props.location.pathname === "/"}/>
        {this.props.children}
      </div>
    )
  }
}
