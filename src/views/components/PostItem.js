import React, {Component, PropTypes} from 'react';
import {ButtonGroup, Button} from 'react-bootstrap';
import {Link} from 'react-router';
import moment from 'moment';

export default class PostItem extends Component {
  static propTypes = {
    deletePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.deletePost = this.deletePost.bind(this);
  }

  deletePost() {
    this.props.deletePost(this.props.id);
  }

  render() {
    const {title, createdAt} = this.props.post,
          calendarDate = createdAt ? moment(createdAt).calendar() : "Onbekend";

    return (
      <tr>
        <td>{title}</td>
        <td>{calendarDate}</td>
        <td className="actions">
          <ButtonGroup>
            <Link to={"posts/" + this.props.id} className="btn btn-primary">
              <i className="fa fa-eye" />
            </Link>
            <Button bsStyle="danger" onClick={this.deletePost}>
              <i className="fa fa-trash" />
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    );
  }
}
