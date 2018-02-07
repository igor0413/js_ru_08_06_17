import {combineReducers} from 'redux'
import counterReducer from './counter'
import {routerReducer} from 'react-router-redux'
import articles from './articles'
import filters from './filters'
import comments from './comments'

export default combineReducers({
  count: counterReducer,
  articles, comments, filters,
  router: routerReducer
})