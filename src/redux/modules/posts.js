const ADD_POST = 'posts/ADD_POST'
const DELETE_POST = 'posts/DELETE_POST'
const EDIT_POST = 'posts/EDIT_POST'
const SET_POST = 'posts/SET_POST'
const FILTER_POST = 'post/FILTER_POST'

export const setPost = (payload) => {
  return { type: SET_POST, payload }
}

export const filterPost = (payload) => {
  return { type: FILTER_POST, payload }
}

const initialState = []

const posts = (state = initialState, action) => {
  switch (action.type) {
    case SET_POST:
      return action.payload
    case FILTER_POST:
      const filteredPosts = state.filter((post) => post.uid === action.payload)
      return filteredPosts
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
