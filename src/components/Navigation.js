import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import logo from '../assets/logo.svg';
import './Navigation.sass';

export default class Navigation extends Component {
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/"><img src={logo} alt="Vercamst Consult" /></a>
          </Navbar.Brand>
          <Navbar.Toggle>
            <div className="icon-hamburger">
              <span />
              <span />
              <span />
            </div>
          </Navbar.Toggle>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href="#wie">Wie</NavItem>
            <NavItem eventKey={2} href="#werknemersparticipatie">Werknemersparticipatie</NavItem>
            <NavItem eventKey={3} href="#blog">Blog</NavItem>
            <NavItem eventKey={4} href="#contact">Contact</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
