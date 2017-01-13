import { PropTypes } from 'react'
import { Component, Link, Goto } from 'jumpsuit'
import { ButtonGroup, Button } from 'react-bootstrap'
import moment from 'moment'
import { deletePost } from '../core/state/management'
import { publishPost, depublishPost } from '../core/state/post'

moment.locale('nl')

export default Component({
  propTypes: {
    post: PropTypes.object.isRequired,
    published: PropTypes.bool.isRequired,
    keyValue: PropTypes.string.isRequired
  },

  getInitialState () {
    return {
      loading: false
    }
  },

  handleDelete () {
    this.setState({loading: true})

    if (window.confirm('Ben je zeker dat je deze post wil verwijderen?')) {
      const { post, published } = this.props
      deletePost(post, published)
    } else {
      this.setState({loading: false})
    }
  },

  handlePublish () {
    this.setState({loading: true})

    if (window.confirm('Ben je zeker dat je deze post wil publiceren?')) {
      const { keyValue, post } = this.props
      publishPost(keyValue, post, false)
    } else {
      this.setState({loading: false})
    }
  },

  handleUnpublish () {
    this.setState({loading: true})

    if (window.confirm('Ben je zeker dat je deze post wil depubliceren?')) {
      const { keyValue, post } = this.props
      depublishPost(keyValue, post, false)
    } else {
      this.setState({loading: false})
    }
  },

  render () {
    const { loading } = this.state
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
            <Button bsStyle='primary' onClick={() => Goto(`/posts/${key}/edit`)} title='Wijzigen' disabled={loading}>
              <i className='icon-pencil' />
            </Button>
            {published
            ? <Button bsStyle='warning' onClick={this.handleUnpublish} title='Unpublish' disabled={loading}>
              <i className='icon-user-times' />
            </Button>
            : <Button bsStyle='success' onClick={this.handlePublish} title='Publish' disabled={loading}>
              <i className='icon-users' />
            </Button>}
            <Button bsStyle='danger' onClick={this.handleDelete} title={published ? 'Depubliceer dit artikel alvorens het te verwijderen' : 'Verwijderen'} disabled={published || loading}>
              <i className='icon-trash' />
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    )
  }
})
