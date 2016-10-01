import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import logo from '../logo.svg';
import './Navigation.css';

export default class Navigation extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/"><img src={logo} className="logo" alt="Vercamst Consult" /></a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1}>Wie</NavItem>
            <NavItem eventKey={2}>Werknemersparticipatie</NavItem>
            <NavItem eventKey={3}>Blog</NavItem>
            <NavItem eventKey={4}>Contact</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
