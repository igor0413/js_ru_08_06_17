import {normalizedComments as defaulComments} from '../fixtures'
import {
  ADD_COMMENT,
  LOAD_ARTICLE_COMMENTS,
  START,
  SUCCESS} from '../constants'
import {arrToMap} from '../helpers'
import {OrderedMap, Record} from "immutable"

const CommentRecord = Record({
  text: null,
  user: null,
  id: null
})

const ReducerState = Record({
  entities: new OrderedMap({})
})

const defaultState = new ReducerState()

export default (commentsState = defaultState, action) => {
  const {type, payload, response, randomId} = action
  switch (type) {
    case ADD_COMMENT:
      return {...commentsState, [randomId]: payload.comment}

    case LOAD_ARTICLE_COMMENTS + SUCCESS:
      return commentsState.update('entities', entities => entities.merge(arrToMap(response, CommentRecord)))
  }

  return commentsState
}