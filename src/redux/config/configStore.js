import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import auth from './modules/auth'
import posts from './modules/posts'
import topics from './modules/topics'

const rootReducer = combineReducers({
  topics,
  auth,
  posts,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
