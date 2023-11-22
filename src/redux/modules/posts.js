import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

const ADD_POST = 'posts/ADD_POST'
const DELETE_POST = 'posts/DELETE_POST'
const EDIT_POST = 'posts/EDIT_POST'

const initialState = []
const fetchData = async () => {
  const querySnapshot = await getDocs(collection(db, 'posts'))

  querySnapshot.forEach((doc) => {
    initialState.push({ id: doc.id, ...doc.data() })
    console.log(`${doc.id} => ${doc.data()}`)
  })

  return initialState
}
fetchData()

const posts = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      const newPost = action.payload
      return [newPost, ...state]
    case DELETE_POST:
      const postId = action.payload
      return state.filter((post) => post.id !== postId)
    case EDIT_POST:
      const { id, editingText } = action.payload
      return state.map((post) => {
        if (post.id === id) {
          return { ...post, content: editingText }
        }
        return post
      })
    default:
      return state
  }
}

export default posts
