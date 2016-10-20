import React, {Component} from 'react';
import {Link} from 'react-router';
import {Button, Col} from 'react-bootstrap';
import classNames from 'classnames';
import isTouchDevice from '../../core/utils/isTouchDevice';
import './ColButton.sass';

export default class ColButton extends Component {
  constructor(props) {
    super(props);

    const colProps = {...props};
    delete colProps.action;
    delete colProps.href;
    delete colProps.bsStyle;
    delete colProps.bsSize;
    colProps.className = classNames(colProps.className, "col-btn", {"touchEnabled": isTouchDevice()});

    this.state = {
      colProps: colProps
    }
  }
  render() {
    return (
      <Col {...this.state.colProps}>
        <Link to={this.props.to} className="col-btn-link">
          <div className="content">
            {this.props.children}
          </div>
          <div className="action">
            <Button bsStyle={this.props.bsStyle} bsSize={this.props.bsSize}>{this.props.action}</Button>
          </div>
        </Link>
      </Col>
    )
  }
}
