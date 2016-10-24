import React, {Component, PropTypes} from 'react';
import {ButtonGroup, Button} from 'react-bootstrap';
import {Link} from 'react-router';
import classNames from 'classnames';
import moment from 'moment';

export default class PostItem extends Component {
  static propTypes = {
    deletePost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.deletePost = this.deletePost.bind(this);
    this.publishPost = this.publishPost.bind(this);
    this.depublishPost = this.depublishPost.bind(this);
  }

  deletePost() {
    this.props.deletePost(this.props.post);
  }

  publishPost() {
    this.props.updatePost(this.props.post, {published: true});
  }

  depublishPost() {
    this.props.updatePost(this.props.post, {published: false});
  }

  render() {
    const {key, title, published, createdAt} = this.props.post,
          calendarDate = createdAt ? moment(createdAt).calendar() : "Onbekend";

    return (
      <tr className={classNames({"warning": !published})}>
        <td>{title}</td>
        <td>{calendarDate}</td>
        <td className="actions">
          <ButtonGroup>
            <Link to={"posts/" + key} className="btn btn-primary" title="Bekijken">
              <i className="fa fa-eye fa-fw" />
            </Link>
            {published ?
              <Button bsStyle="warning" onClick={this.depublishPost} title="Depubliceren">
                <i className="fa fa-user-times fa-fw" />
              </Button>
            :
              <Button bsStyle="success" onClick={this.publishPost} title="Publiceren">
                <i className="fa fa-users fa-fw" />
              </Button>
            }
            <Button bsStyle="danger" onClick={this.deletePost} title={published ? "Depubliceer dit artikel alvorens het te verwijderen" : "Verwijderen"} disabled={published}>
              <i className="fa fa-trash fa-fw" />
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    );
  }
}
