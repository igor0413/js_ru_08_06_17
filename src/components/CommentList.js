import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Comment from './Comment'
import CommentForm from './CommentForm'
import toggleOpen from '../decorators/toggleOpen'
import {connect} from 'react-redux'
import {loadArticleComments} from '../AC'
import Loader from "./Loader";
import LocalizedText from './LocalizedText'

class CommentList extends Component {
  static contextTypes = {
    store: PropTypes.object,
    router: PropTypes.object,
    user: PropTypes.string
  }

  componentWillReceiveProps({ isOpen, article, loadArticleComments }) {
    if (!this.props.isOpen && isOpen && !article.commentsLoading && !article.commentsLoaded) {
      loadArticleComments(article.id)
    }
  }

  render() {
    const {article, isOpen, toggleOpen} = this.props
    console.log('context', this.context)
    const text = isOpen ? 'hide comments' : 'show comments'
    return (
      <div>
        <h3>User: {this.context.user}</h3>
        <button onClick={toggleOpen}><LocalizedText>{text}</LocalizedText></button>
        {getBody({article, isOpen})}
      </div>
    )
  }
}

CommentList.propTypes = {
  comments: PropTypes.array,
  //from toggleOpen decorator
  isOpen: PropTypes.bool,
  toggleOpen: PropTypes.func
}

function getBody({article: {comments = [], id, commentsLoaded, commentsLoading}, isOpen}) {
  if (!isOpen) return null
  if (commentsLoading) return <Loader/>
  if (!commentsLoaded) return null

  if (!comments.length) return (
    <div>
      <p>No comments yet</p>
      <CommentForm articleId={id}/>
    </div>
  )

  return (
    <div>
      <ul>
        {comments.map(id => <li key={id}><Comment id={id}/></li>)}
      </ul>
      <CommentForm articleId={id}/>
    </div>
  )
}

export default connect(null, {loadArticleComments}, null, {pure: false})(toggleOpen(CommentList))