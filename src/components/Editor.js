import { PropTypes } from 'react'
import { Component } from 'jumpsuit'
import RichTextEditor, { createValueFromString, createEmptyValue } from 'react-rte'
import './Editor.sass'

export default Component({
  propTypes: {
    onInitialized: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
  },

  getInitialState () {
    return {
      value: this.props.value ? createValueFromString(this.props.value, 'html') : createEmptyValue()
    }
  },

  onChange (value) {
    this.setState({ value: value })
    this.props.onChange(value)
  },

  componentDidMount () {
    this.props.onInitialized(this.state.value)
  },

  render () {
    const toolbarConfig = {
      display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
      INLINE_STYLE_BUTTONS: [
        {label: 'Bold', style: 'BOLD'},
        {label: 'Italic', style: 'ITALIC'},
        {label: 'Underline', style: 'UNDERLINE'}
      ],
      BLOCK_TYPE_DROPDOWN: [
        {label: 'Normal', style: 'unstyled'},
        {label: 'Heading Large', style: 'header-one'},
        {label: 'Heading Medium', style: 'header-two'},
        {label: 'Heading Small', style: 'header-three'}
      ],
      BLOCK_TYPE_BUTTONS: [
        {label: 'UL', style: 'unordered-list-item'},
        {label: 'OL', style: 'ordered-list-item'}
      ]
    }
    return (
      <RichTextEditor
        className='rte'
        toolbarConfig={toolbarConfig}
        value={this.state.value}
        onChange={this.onChange}
        ref='editor'
      />
    )
  }
})
