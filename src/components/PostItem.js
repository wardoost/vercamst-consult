import { PropTypes } from 'react'
import { Component, Link } from 'jumpsuit'
import { ButtonGroup, Button } from 'react-bootstrap'
import classNames from 'classnames'
import moment from 'moment'

moment.locale('nl')

export default Component({
  propTypes: {
    deletePost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
  },

  deletePost () {
    this.props.deletePost(this.props.post)
  },

  publishPost () {
    this.props.updatePost(this.props.post, {published: true})
  },

  depublishPost () {
    this.props.updatePost(this.props.post, {published: false})
  },

  render () {
    const {key, title, published, createdAt} = this.props.post
    const calendarDate = createdAt ? moment(createdAt).calendar() : 'Onbekend'

    return (
      <tr className={classNames({'warning': !published})}>
        <td>
          <Link to={`/posts/${key}`} title='Bekijken'>
            {title}
          </Link>
        </td>
        <td>{calendarDate}</td>
        <td className='actions'>
          <ButtonGroup>
            {published
            ? <Button bsStyle='warning' onClick={this.depublishPost} title='Depubliceren'>
              <i className='icon-user-times' />
            </Button>
            : <Button bsStyle='success' onClick={this.publishPost} title='Publiceren'>
              <i className='icon-users' />
            </Button>
            }
            <Link to={`/posts/${key}/edit`} className='btn btn-primary' title='Wijzigen'>
              <i className='icon-pencil' />
            </Link>
            <Button bsStyle='danger' onClick={this.deletePost} title={published ? 'Depubliceer dit artikel alvorens het te verwijderen' : 'Verwijderen'} disabled={published}>
              <i className='icon-trash' />
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    )
  }
})