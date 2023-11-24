const SET_ISLOGIN = 'auth/SET_ISLOGIN'
const SET_LOGIN_USER_UID = 'auth/SET_LOGIN_USER_UID'

export const setIsLogin = (payload) => {
  return { type: SET_ISLOGIN, payload }
}

export const setloginUserUid = (payload) => {
  return { type: SET_LOGIN_USER_UID, payload }
}

const initialSate = {
  isLogin: false,
  loginUserUid: 'anonymous',
}

const auth = (state = initialSate, action) => {
  console.log('auth payload', action.payload)
  switch (action.type) {
    case SET_ISLOGIN:
      return { ...state, isLogin: action.payload }
    case SET_LOGIN_USER_UID:
      return { ...state, loginUserUid: action.payload }
    default:
      return state
  }
}

export default auth
