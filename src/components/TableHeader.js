import { PropTypes } from 'react'
import { Component } from 'jumpsuit'
import classNames from 'classnames'
import _ from 'lodash'
import './TableHeader.sass'

export default Component({
  propTypes: {
    label: PropTypes.string.isRequired,
    keyValue: PropTypes.string,
    onSort: PropTypes.func,
    activeSort: PropTypes.string,
    sortReverse: PropTypes.bool
  },

  getDefaultProps () {
    return {
      sortReverse: false
    }
  },

  getInitialState () {
    return {
      sortable: this.props.keyValue && this.props.activeSort
    }
  },

  handleSort (e) {
    if (this.state.sortable) this.props.onSort(this.props.keyValue)
  },

  render () {
    const sortActive = this.props.activeSort === this.props.keyValue

    return (
      <th className={classNames(this.props.className, {'sortable': this.state.sortable, 'active': sortActive})} onClick={this.handleSort} title={`Sorteren op ${this.props.label}`}>
        {_.upperFirst(this.props.label)}
        {sortActive
        ? <i className={`icon-angle-${this.props.sortReverse ? 'up' : 'down'}`} />
        : null}
      </th>
    )
  }
})
