const SET_LOGIN = 'auth/SET_LOGIN'
const SET_LOGOUT = 'auth/SET_LOGOUT'

export const setLogin = (payload) => {
  return { type: SET_LOGIN, payload }
}

export const setLogout = () => {
  return { type: SET_LOGOUT }
}

const initialSate = {
  isLogin: false,
  loginUserUid: 'anonymous',
}

const auth = (state = initialSate, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return { isLogin: true, loginUserUid: action.payload }
    case SET_LOGOUT:
      return { isLogin: false, loginUserUid: 'anonymous' }
    default:
      return state
  }
}

export default auth
