import { combineReducers, createStore } from 'redux'
// import posts from './modules/posts'
import topics from './modules/topics'

const rootReducer = combineReducers({ topics })

const store = createStore(rootReducer)

export default store
