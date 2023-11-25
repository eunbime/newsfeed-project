import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLogin } from 'redux/modules/auth'
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

  const signUp = async (event) => {
    event.preventDefault()
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      dispatch(setLogin(userCredential.user.uid))
      onModalClose()
      // TODO: db에 userInfo 객체도 생성 추가
      await setDoc(doc(collection(db, 'userInfo'), userCredential.user.uid), {
        email: userCredential.user.email,
      })
      console.log('회원가입 완료', userCredential.user.uid)
    } catch (error) {
      alert(`회원가입 실패 :${error.code}`) //TODO : (선택) 사유에 따른 예외처리
    }
  }

  const signIn = async (event) => {
    event.preventDefault()
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      console.log('로그인 완료', userCredential.user.uid)
      dispatch(setLogin(userCredential.user.uid))
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
