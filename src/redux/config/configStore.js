import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import auth from './modules/auth'
import topics from './modules/topics'

const rootReducer = combineReducers({
  topics: topics, auth
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
