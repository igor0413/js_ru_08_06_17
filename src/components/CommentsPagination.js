import React, {Component} from 'react';
import {connect} from 'react-redux'
import {checkAndLoadCommentsForPage} from '../AC'
import {NavLink} from 'react-router-dom'
import Loader from '../components/Loader'
import Comment from '../components/Comment'

class CommentsPagination extends Component {
  componentWillMount() {
    this.props.checkAndLoadCommentsForPage(this.props.page)
  }

  componentWillReceiveProps({page, checkAndLoadCommentsForPage}) {
    console.log('New page is', page)
    checkAndLoadCommentsForPage(page)
  }

  getPaginator() {
    const {total} = this.props
    const items = []
    for (let i = 1; i <= Math.ceil(total/5); i++) {
      items.push(<li key={i}><NavLink to={`/comments/${i}`} activeStyle={{color: 'red'}}>{i}</NavLink></li>)
    }
    return <ul>{items}</ul>
  }

  getCommentsItem() {
    const {comments, loading} = this.props
    if(loading || !comments) return <Loader/>
    const commentItems = comments.map(id => <li key={id}><Comment id={id}/></li>)
    return <ul>{commentItems}</ul>
  }

  render() {
    const {total} = this.props
    if (!total) return <Loader/>
    return (
      <div>
        {this.getCommentsItem()}
        {this.getPaginator()}
      </div>
    )
  }
}


export default connect((state, {page}) => {
  const {total, pagination} = state.comments
  return {
    total,
    loading: pagination.getIn([page, 'loading']),
    comments: pagination.getIn([page, 'ids'])
  }
}, {checkAndLoadCommentsForPage} )(CommentsPagination)
