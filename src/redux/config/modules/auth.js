const SET_ISLOGIN = 'auth/SET_ISLOGIN'
const SET_LOGIN_USER = 'auth/SET_LOGIN_USER'

export const setIsLogin = (payload) => {
  return { type: SET_ISLOGIN, payload }
}

export const setLoginUser = (payload) => {
  return { type: SET_LOGIN_USER, payload }
}

const initialSate = {
  isLogin: false,
  loginUser: 'anonymous',
}

const auth = (state = initialSate, action) => {
  console.log('auth ', state)
  switch (action.type) {
    case SET_ISLOGIN:
      return { ...state, isLogin: action.payload }
    case SET_LOGIN_USER:
      return { ...state, loginUser: action.payload }
    default:
      return state
  }
}

export default auth
