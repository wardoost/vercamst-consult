import { PropTypes } from 'react'
import { Component, Link } from 'jumpsuit'
import { ButtonGroup, Button } from 'react-bootstrap'
import classNames from 'classnames'
import moment from 'moment'

moment.locale('nl')

export default Component({
  propTypes: {
    post: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    published: PropTypes.bool.isRequired
  },

  deletePost () {
    this.props.deletePost(this.props.post)
  },

  render () {
    const { published } = this.props
    const { key, title, createdAt } = this.props.post
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
