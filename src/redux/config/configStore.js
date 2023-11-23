import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import topics from './modules/topics'

const rootReducer = combineReducers({
  topics: topics,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
