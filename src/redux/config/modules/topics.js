const SET_TOPIC = 'topic/SET_TOPIC'

export const setTopic = (payload) => {
  return { type: SET_TOPIC, payload }
}

const initialState = 'Hot Place🔥'

const topics = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOPIC:
      const activeTopic = action.payload
      return activeTopic
    default:
      return state
  }
}
export default topics
