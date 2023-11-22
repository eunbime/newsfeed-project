import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

const SET_TOPIC = 'topics/SET_TOPIC'

export const setTopic = (payload) => {
  return { type: SET_TOPIC, payload }
}

const initialTopics = []
const fetchData = async () => {
  const querySnapshot = await getDocs(collection(db, 'topics'))

  querySnapshot.forEach((doc) => {
    initialTopics.push({ id: doc.id, ...doc.data() })
    console.log(`${doc.id} => ${doc.data()}`)
  })

  return initialTopics
}
fetchData()

const topics = (state = initialTopics, action) => {
  switch (action.type) {
    case SET_TOPIC:
      const selectedTopic = action.payload
      return selectedTopic
    default:
      return state
  }
}

export default topics
