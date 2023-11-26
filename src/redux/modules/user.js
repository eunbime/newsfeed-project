const SET_USER = 'login/SET_USER'
const LOGOUT_USER = 'login/LOGOUT_USER'

export const setUser = (payload) => {
  return { type: SET_USER, payload }
}

export const logOutUser = (payload) => {
  return { type: LOGOUT_USER }
}

const initialState = {
  nickname: '닉네임을 설정해주세요!',
  name: '이름이 뭐에요?',
  email: 'email@email.com',
  ment: '유저 한마디를 작성해주세요!',
  userimg: require('../../assets/default-profile.jpeg'),
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload }
    case LOGOUT_USER:
      return { initialState }
    default:
      return state
  }
}

export default user
