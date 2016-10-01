import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import logo from '../logo.svg';
import './Navigation.css';

export default class Navigation extends Component {
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/"><img src={logo} alt="Vercamst Consult" /></a>
          </Navbar.Brand>
          <Navbar.Toggle />
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
