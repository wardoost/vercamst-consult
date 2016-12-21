import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import classNames from 'classnames';
import isTouchDevice from '../../../core/utils/isTouchDevice';
import './style.sass';

export default class VerticalScroller extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topReached: true,
      bottomReached: false,
      scrollOffset: 0,
      minOffset: 0,
      indicatorHeight: 0,
      indicatorOffset: 0,
      touchEnabled: isTouchDevice(),
      active: false
    }

    this.scrollUp = this.scrollUp.bind(this);
    this.scrollDown = this.scrollDown.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    const containerHeight = this.refs.verticalScrollerContainer.offsetHeight,
          contentHeight = this.refs.verticalScrollerContent.offsetHeight;

    this.setState({
      containerHeight: containerHeight,
      contentHeight: contentHeight,
      maxOffset: contentHeight - containerHeight,
      indicatorHeight: Math.round(containerHeight / (contentHeight / containerHeight)),
      indicatorOffset: 0
    })

    window.addEventListener('resize', this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  handleResize(e) {
    const contentHeight = this.refs.verticalScrollerContent.offsetHeight,
          containerHeight = isNaN(e) ? this.refs.verticalScrollerContainer.offsetHeight : e,
          maxOffset = contentHeight - containerHeight,
          newOffset = this.state.scrollOffset / this.state.maxOffset * maxOffset,
          indicatorHeight = Math.round(containerHeight / (contentHeight / containerHeight));

    this.setState({
      containerHeight: containerHeight,
      contentHeight: contentHeight,
      maxOffset: maxOffset,
      indicatorHeight: indicatorHeight,
      indicatorOffset: Math.round((containerHeight - indicatorHeight) * newOffset / (maxOffset - this.state.minOffset))
    })
  }
  scrollUp() {
    const newOffset = this.state.scrollOffset - this.state.containerHeight,
          scrollOffset = newOffset > this.state.minOffset ? newOffset : this.state.minOffset;

    this.setState({
      scrollOffset: Math.round(scrollOffset),
      topReached: newOffset > this.state.minOffset ? false: true,
      bottomReached: newOffset < this.state.maxOffset ? false : true,
      indicatorOffset: Math.round((this.state.containerHeight - this.state.indicatorHeight) * scrollOffset / (this.state.maxOffset - this.state.minOffset)),
      active: true
    })
  }
  scrollDown() {
    const newOffset = this.state.scrollOffset + this.state.containerHeight,
          scrollOffset = newOffset < this.state.maxOffset ? newOffset : this.state.maxOffset;

    if (!this.state.active) {
      this.handleResize(200);
    }

    this.setState({
      scrollOffset: Math.round(scrollOffset),
      topReached: newOffset > this.state.minOffset ? false: true,
      bottomReached: newOffset < this.state.maxOffset ? false : true,
      indicatorOffset: Math.round((this.state.containerHeight - this.state.indicatorHeight) * scrollOffset / (this.state.maxOffset - this.state.minOffset)),
      active: true
    })
  }
  render() {
    return (
      <div className={classNames("vertical-scroller", {"active": this.state.active, "touchEnabled": this.state.touchEnabled})}>
        <Button className={"vertical-scroller-btn up"} onClick={this.scrollUp} disabled={this.state.topReached}>
          <i className="icon-angle-double-up" />
        </Button>
        <div className={classNames("vertical-scroller-container", {"bottomReached": this.state.bottomReached, "topReached": this.state.topReached})} ref="verticalScrollerContainer">
          <div className="vertical-scroller-content" ref="verticalScrollerContent" style={{top: -this.state.scrollOffset}}>
            {this.props.children}
          </div>
          <span className="vertical-scroller-indicator" ref="vertical-scroller-indicator" style={{height: this.state.indicatorHeight, top: this.state.indicatorOffset}} />
        </div>
        <Button className="vertical-scroller-btn down" onClick={this.scrollDown} disabled={this.state.bottomReached}>
          {!this.state.active && this.props.label ? this.props.label : <i className="icon-angle-double-down" />}
        </Button>
      </div>
    )
  }
}
