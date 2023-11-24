import { combineReducers, createStore } from 'redux'
import posts from 'redux/modules/posts'
import topics from 'redux/modules/topics'
import auth from './modules/auth'

const rootReducer = combineReducers({
  posts,
  topics,
  auth,
})
const store = createStore(rootReducer) // 스토어와 모듈 연결

export default store
