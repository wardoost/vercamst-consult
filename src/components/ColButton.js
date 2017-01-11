import { Component, Link } from 'jumpsuit'
import { Button, Col } from 'react-bootstrap'
import classNames from 'classnames'
import isTouchDevice from '../core/utils/isTouchDevice'
import './ColButton.sass'

export default Component({
  render () {
    const colProps = {...this.props}
    delete colProps.action
    delete colProps.to
    delete colProps.href
    delete colProps.target
    delete colProps.bsStyle
    delete colProps.bsSize
    colProps.className = classNames(colProps.className, 'col-btn', {'touchEnabled': isTouchDevice()})

    return (
      <Col {...colProps}>
        {this.props.to
          ? <Link to={this.props.to} className='col-btn-link'>
            <div className='content'>
              {this.props.children}
            </div>,
            <div className='action'>
              <Button bsStyle={this.props.bsStyle} bsSize={this.props.bsSize}>{this.props.action}</Button>
            </div>
          </Link>
          : <a href={this.props.href} className='col-btn-link' target={this.props.target || '_self'}>
            <div className='content'>
              {this.props.children}
            </div>,
            <div className='action'>
              <Button bsStyle={this.props.bsStyle} bsSize={this.props.bsSize}>{this.props.action}</Button>
            </div>
          </a>
        }
      </Col>
    )
  }
})
