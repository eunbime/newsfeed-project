import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLogin } from 'redux/modules/auth'
import { setUser } from 'redux/modules/user'
import { auth, db } from '../firebase'

function Login({ onModalClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event
    if (name === 'email') {
      setEmail(value)
    }
    if (name === 'password') {
      setPassword(value)
    }
  }

  /**
   * redux로 login user 저장 ,
   * db에 userInfo 객체도 생성 추가 (email만 저장)
   * local storage에 로그인 정보 저장
   */
  const signUp = async (event) => {
    event.preventDefault()
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      dispatch(setLogin(userCredential.user.uid))
      dispatch(setUser({ email: userCredential.user.email }))

      await setDoc(doc(collection(db, 'userInfo'), userCredential.user.uid), {
        email: userCredential.user.email,
      })

      localStorage.setItem('useruid', userCredential.user.uid)
      localStorage.setItem('useremail', userCredential.user.email)
      console.log('회원가입 완료', userCredential.user.uid)
      onModalClose()
    } catch (error) {
      alert(`회원가입 실패 :${error.code}`) //TODO : (선택) 사유에 따른 예외처리
    }
  }

  /** 로그인 시 로그인 정보 local storage 저장
   * redux로 user 정보 저장
   */
  const signIn = async (event) => {
    event.preventDefault()
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      dispatch(setLogin(userCredential.user.uid))
      dispatch(setUser({ email: userCredential.user.email }))
      localStorage.setItem('useruid', userCredential.user.uid)
      localStorage.setItem('useremail', userCredential.user.email)
      console.log('로그인 완료', userCredential.user.uid)
      onModalClose()
    } catch (error) {
      alert(`로그인 실패 :${error.code}`) //TODO : (선택) 사유에 따른 예외처리
    }
  }

  return (
    <div>
      <h2>로그인 페이지</h2>
      <form>
        <div>
          <label>이메일 : </label>
          <input
            type="email"
            value={email}
            name="email"
            onChange={onChange}
            required
          ></input>
        </div>
        <div>
          <label>비밀번호 : </label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={onChange}
            required
          ></input>
        </div>
        <button onClick={signUp}>회원가입</button>
        <button onClick={signIn}>로그인</button>
      </form>
    </div>
  )
}

export default Login
