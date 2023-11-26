const SET_USER = 'login/SET_USER'

export const setUser = (payload) => {
  return { type: SET_USER, payload }
}

const initialState = {
  nickname: '닉네임을 설정해주세요!',
  name: '이름이 뭐에요?',
  email: 'email@email.com',
  ment: '유저 한마디를 작성해주세요!',
  interests: ['관심사'],
  userimg: 'assets/default-profile.jpeg',
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default user
