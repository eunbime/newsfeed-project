const SET_TOPIC = 'topics/SET_TOPIC'

export const setTopic = (payload) => {
  return { type: SET_TOPIC, payload }
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
