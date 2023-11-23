import { combineReducers, createStore } from 'redux'
// import posts from './modules/posts'
import auth from './modules/auth'
import topics from './modules/topics'

const rootReducer = combineReducers({ topics, auth })

const store = createStore(rootReducer)

export default store
