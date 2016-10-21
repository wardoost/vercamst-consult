import React, {Component, PropTypes} from 'react';
import RichTextEditor from 'react-rte';
import './Editor.sass';

export default class Editor extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: RichTextEditor.createEmptyValue()
    }
  }

  onChange = (value) => {
    this.setState({value});
    this.props.onChange(value);
  }

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
    };
    return (
      <RichTextEditor
        toolbarConfig={toolbarConfig}
        value={this.state.value}
        onChange={this.onChange}
        ref="editor"
      />
    );
  }
}
