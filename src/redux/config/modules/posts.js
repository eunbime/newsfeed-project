import db from 'firebase'
// post데이터의 json파일로 변경 하기

// post 추가
const ADD_POST = 'posts/ADD_POST'
// post 삭제
const DELETE_POST = 'posts/DELETE_POST'
// post 수정
const EDIT_POST = 'posts/EDIT_POST'

export const addPost = (payload) => {
  return { type: ADD_POST, payload }
}

export const deletePost = (payload) => {
  return { type: DELETE_POST, payload }
}

export const editPost = (payload) => {
  return { type: EDIT_POST, payload }
}

const initialState = db

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
