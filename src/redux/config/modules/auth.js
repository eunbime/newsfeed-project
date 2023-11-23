const SET_ISLOGIN = 'auth/SET_ISLOGIN'

export const setIsLogin = (payload) => {
  return { type: SET_ISLOGIN, payload }
}

const initialSate = {
  isLogin: false,
}

const auth = (state = initialSate, action) => {
  console.log('auth ', state)
  switch (action.type) {
    case SET_ISLOGIN:
      return { ...state, isLogin: action.payload }
    default:
      return state
  }
}

export default auth
