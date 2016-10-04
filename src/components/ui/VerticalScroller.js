import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import './VerticalScroller.sass';

export default class VerticalScroller extends Component {
  constructor(props) {
    super(props);

    this.state = {
      btnUpDisabled: true,
      btnDownDisabled: false,
      scrollOffset: 0
    }

    this.scrollUp = this.scrollUp.bind(this);
    this.scrollDown = this.scrollDown.bind(this);
  }
  componentDidMount() {
    const containerHeight = this.refs.vScrollerContainer.offsetHeight,
          contentHeight = this.refs.vScrollerContent.offsetHeight;

    this.setState({
      containerHeight: containerHeight,
      contentHeight: contentHeight,
      maxOffset: contentHeight - containerHeight
    })

  }
  componentDidUpdate(prevProps, prevState) {
    const contentHeight = this.refs.vScrollerContent.offsetHeight,
          containerHeight = this.refs.vScrollerContainer.offsetHeight;

    if (prevState.contentHeight !== contentHeight || prevState.containerHeight !== containerHeight) {
      this.setState({
        containerHeight: containerHeight,
        contentHeight: contentHeight,
        minOffset: 0,
        maxOffset: contentHeight - containerHeight
      })
    }
  }
  scrollUp() {
    const newOffset = this.state.scrollOffset - this.state.containerHeight;

    this.setState({
      scrollOffset: newOffset > this.state.minOffset ? newOffset : 0,
      btnUpDisabled: newOffset > this.state.minOffset ? false: true,
      btnDownDisabled: newOffset < this.state.maxOffset ? false : true
    })
  }
  scrollDown() {
    const newOffset = this.state.scrollOffset + this.state.containerHeight;

    this.setState({
      scrollOffset: newOffset < this.state.maxOffset ? newOffset : this.state.maxOffset,
      btnUpDisabled: newOffset > this.state.minOffset ? false: true,
      btnDownDisabled: newOffset < this.state.maxOffset ? false : true
    })
  }
  render() {
    return (
      <div className={"vertical-scroller" + (this.state.scrollable ? " scrollable" : "")}>
        <Button className="vertical-scroller-btn up" onClick={this.scrollUp} disabled={this.state.btnUpDisabled}>
          <i className="fa fa-angle-double-up" />
        </Button>
        <div className="vertical-scroller-container" ref="vScrollerContainer">
          <div className="vertical-scroller-content" ref="vScrollerContent" style={{top: -this.state.scrollOffset}}>
            {this.props.children}
          </div>
        </div>
        <Button className="vertical-scroller-btn down" onClick={this.scrollDown} disabled={this.state.btnDownDisabled}>
          <i className="fa fa-angle-double-down" />
        </Button>
      </div>
    )
  }
}
