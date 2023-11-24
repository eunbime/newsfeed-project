const SET_TOPIC = 'topics/SET_TOPIC'
const SHOW_MORE_TOPICS = 'SHOW_MORE_TOPICS'
const SHOW_LESS_TOPICS = 'SHOW_LESS_TOPICS'

export const setTopic = (payload) => {
  return { type: SET_TOPIC, payload }
}

export const showMoreTopics = () => {
  return { type: SHOW_MORE_TOPICS }
}

export const showLessTopics = () => {
  return { type: SHOW_LESS_TOPICS }
}

const initialState = []

const topics = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOPIC:
      return action.payload
    default:
      return state
  }
}

export default topics
