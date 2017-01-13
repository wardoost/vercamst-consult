import { Component } from 'jumpsuit'
import { Button } from 'react-bootstrap'
import classNames from 'classnames'
import isTouchDevice from '../core/utils/isTouchDevice'
import './VerticalScroller.sass'

export default Component({
  getInitialState () {
    return {
      topReached: true,
      bottomReached: false,
      scrollOffset: 0,
      minOffset: 0,
      indicatorHeight: 0,
      indicatorOffset: 0,
      touchEnabled: isTouchDevice(),
      active: false
    }
  },

  componentDidMount () {
    const containerHeight = this.refs.verticalScrollerContainer.offsetHeight
    const contentHeight = this.refs.verticalScrollerContent.offsetHeight

    this.setState({
      containerHeight: containerHeight,
      contentHeight: contentHeight,
      maxOffset: contentHeight - containerHeight,
      indicatorHeight: Math.round(containerHeight / (contentHeight / containerHeight)),
      indicatorOffset: 0
    })

    window.addEventListener('resize', this.handleResize)
  },

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  },

  handleResize (e) {
    const contentHeight = this.refs.verticalScrollerContent.offsetHeight
    const containerHeight = isNaN(e) ? this.refs.verticalScrollerContainer.offsetHeight : e
    const maxOffset = contentHeight - containerHeight
    const newOffset = this.state.scrollOffset / this.state.maxOffset * maxOffset
    const indicatorHeight = Math.round(containerHeight / (contentHeight / containerHeight))

    this.setState((prevState, props) => ({
      containerHeight: containerHeight,
      contentHeight: contentHeight,
      maxOffset: maxOffset,
      indicatorHeight: indicatorHeight,
      indicatorOffset: Math.round((containerHeight - indicatorHeight) * newOffset / (maxOffset - prevState.minOffset))
    }))
  },

  scrollUp () {
    const { scrollOffset, containerHeight, minOffset, maxOffset, indicatorHeight } = this.state
    const checkOffset = scrollOffset - containerHeight
    const newOffset = checkOffset > minOffset ? checkOffset : minOffset

    this.setState({
      scrollOffset: Math.round(newOffset),
      topReached: newOffset <= minOffset,
      bottomReached: newOffset >= maxOffset,
      indicatorOffset: Math.round((containerHeight - indicatorHeight) * newOffset / (maxOffset - minOffset)),
      active: true
    })
  },

  scrollDown () {
    const { scrollOffset, containerHeight, minOffset, maxOffset, indicatorHeight } = this.state
    const checkOffset = scrollOffset + containerHeight
    const newOffset = checkOffset < maxOffset ? checkOffset : maxOffset

    if (!this.state.active) {
      this.handleResize(200)
    }

    this.setState({
      scrollOffset: Math.round(newOffset),
      topReached: newOffset <= minOffset,
      bottomReached: newOffset >= maxOffset,
      indicatorOffset: Math.round((containerHeight - indicatorHeight) * newOffset / (maxOffset - minOffset)),
      active: true
    })
  },

  render () {
    const { active, touchEnabled, topReached, bottomReached, scrollOffset, indicatorHeight, indicatorOffset } = this.state
    return (
      <div className={classNames('vertical-scroller', {'active': active, 'touchEnabled': touchEnabled})}>
        <Button className='vertical-scroller-btn up' onClick={this.scrollUp} disabled={topReached}>
          <i className='icon-angle-double-up' />
        </Button>
        <div className={classNames('vertical-scroller-container', {'bottomReached': bottomReached, 'topReached': topReached})} ref='verticalScrollerContainer'>
          <div className='vertical-scroller-content' ref='verticalScrollerContent' style={{top: -scrollOffset}}>
            {this.props.children}
          </div>
          <span className='vertical-scroller-indicator' ref='vertical-scroller-indicator' style={{height: indicatorHeight, top: indicatorOffset}} />
        </div>
        <Button className='vertical-scroller-btn down' onClick={this.scrollDown} disabled={bottomReached}>
          {!active && this.props.label ? this.props.label : <i className='icon-angle-double-down' />}
        </Button>
      </div>
    )
  }
})
