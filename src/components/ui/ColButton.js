import React from 'react';
import {Button, Col} from 'react-bootstrap';
import isTouchDevice from '../../utils/isTouchDevice';
import './ColButton.sass';

export default class ColButton extends Col {
  constructor(props) {
    super(props);

    const colProps = {...props};
    delete colProps.action;
    delete colProps.href;
    delete colProps.bsStyle;
    delete colProps.bsSize;
    colProps.className += " col-btn"

    this.state = {
      touchEnabled: isTouchDevice(),
      colProps: colProps
    }
  }

  render() {
    return (
      <Col {...this.state.colProps}>
        <div className="content">
          {this.props.children}
        </div>
        <div className={"action" + (this.state.touchClass ? " isTouchDevice" : "")}>
          <Button bsStyle={this.props.bsStyle} bsSize={this.props.bsSize} href={this.props.href}>{this.props.action}</Button>
        </div>
      </Col>
    )
  }
}
