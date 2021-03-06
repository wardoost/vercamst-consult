import { Component } from 'jumpsuit'
import { Grid, Row, Col, Clearfix, Button } from 'react-bootstrap'
import _ from 'lodash'
import moment from 'moment'
import blogState, { loadPosts, loadMorePosts } from '../../../core/state/blog'
import ColButton from '../../../components/ColButton'
import Loading from '../../../components/Loading'
import './Blog.sass'

moment.locale('nl')

export default Component({
  componentWillMount () {
    loadPosts()
  },

  componentWillUnmount () {
    blogState.reset()
  },

  checkCreateClearfix (i) {
    let clearFixes = []
    if (i % 2 === 0) clearFixes.push(<Clearfix visibleSmBlock key={'cf2-' + i} />)
    if (i % 3 === 0) clearFixes.push(<Clearfix visibleMdBlock visibleLgBlock key={'cf3-' + i} />)
    return clearFixes
  },

  createPosts () {
    return this.props.posts.map((post, index) => {
      const {title, body, createdAt} = post
      const humanDate = moment(createdAt).format('dddd D MMMM YYYY')
      const summary = _.truncate(body.replace(/\n/gm, ' ').replace(/<(?:.|\n)*?>/gm, ''), {length: 300})

      return ([
        <ColButton sm={6} md={4} className='article' key={post.key} to={'/posts/' + post.key} action='Lees meer' >
          <h2>{title}</h2>
          {createdAt ? <p className='text-muted'>{humanDate}</p> : null}
          <div className='summary'>
            <p>{summary}</p>
          </div>
        </ColButton>,
        this.checkCreateClearfix(index + 1)
      ])
    })
  },

  render () {
    return (
      <section id='blog'>
        <Grid>
          <Row>
            <Col md={12}>
              {!this.props.loading && !this.props.posts.length
              ? <h1 className='text-center'>Blog binnenkort online!</h1>
              : <h1>Blog</h1>
              }
            </Col>
          </Row>
          <Row>
            {this.props.loading && !this.props.posts.length
            ? <Col md={12}>
              <Loading label='Loading blogposts...' />
            </Col>
            : this.createPosts()
            }
          </Row>
          {!this.props.onLastPage && this.props.posts.length
          ? <Row>
            <Col md={12} className='text-center'>
              <Button className='show-more' bsStyle='primary' onClick={loadMorePosts} disabled={this.props.loading}>
                Toon meer {this.props.loading ? <i className='icon-circle-notch icon-spin' /> : null }
              </Button>
            </Col>
          </Row>
          : null }
        </Grid>
      </section>
    )
  }
}, state => {
  return {
    ...state.blog
  }
})
