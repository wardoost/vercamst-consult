import { PropTypes } from 'react'
import { Component, Link } from 'jumpsuit'
import { ButtonGroup, Button } from 'react-bootstrap'
import moment from 'moment'

moment.locale('nl')

export default Component({
  propTypes: {
    post: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    published: PropTypes.bool.isRequired
  },

  deletePost () {
    if (window.confirm('Ben je zeker dat je deze post wil verwijderen?')) {
      this.props.deletePost(this.props.post)
    }
  },

  render () {
    const { published } = this.props
    const { key, title, createdAt, updatedAt } = this.props.post
    const calendarCreateDate = createdAt ? moment(createdAt).calendar() : 'Onbekend'
    const calendarUpdateDate = updatedAt ? moment(updatedAt).calendar() : 'Onbekend'

    return (
      <tr>
        <td>
          <Link to={`/posts/${key}`} title='Bekijken'>
            {title}
          </Link>
        </td>
        <td>{calendarCreateDate}</td>
        <td>{calendarUpdateDate}</td>
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
