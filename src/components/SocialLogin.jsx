import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLogin } from 'redux/modules/auth'
import { setUser } from 'redux/modules/user'
import { auth } from '../firebase'

// 이 코드도 개선점이 많은 코드이나 이런식으로 바꿔갈 수 있다는 감을 잡으시면 좋을 것 같습니다.

const SOCIAL_LIST = ['google']

function SocialLogin() {
  const dispatch = useDispatch()
  //const user = useSelector((state) => state.user)
  //   const {
  //     user,
  //   } = useSelector((state) => state)
  const {
    auth: { isLogin },
    user,
  } = useSelector((state) => state)
  const [userlocal, setUserlocal] = useState({ token: '', userName: '' })

  const signInWith = async (what) => {
    let Provider
    if (what === 'google') {
      Provider = GoogleAuthProvider
    }
    if (what === 'github') {
      Provider = GithubAuthProvider
    }

    const res = await signInWithPopup(auth, new Provider())
    const credential = Provider.credentialFromResult(res) // 사용 설명서
    const token = credential.accessToken
    const userName = res.user.displayName

    setUserlocal({ token, userName })

    dispatch(setUser({ name: res.user.displayName }))
    dispatch(setLogin({ isLogin: true, loginUserUid: token }))
    // db에 저장, redux 로그인 여부 저장, user정보 저장
  }

  return (
    <div>
      {SOCIAL_LIST.map((social) => (
        <button onClick={() => signInWith(social)}>{social}로그인</button>
      ))}

      {/* <h3>{userlocal.token}</h3> */}
      <h3> 유저로컬 {userlocal.userName}</h3>
      <h3> 유저리덕스 {user.name}</h3>
    </div>
  )
}

export default SocialLogin
