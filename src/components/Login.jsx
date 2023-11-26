import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLogin } from 'redux/modules/auth'
import { setUser } from 'redux/modules/user'
import styled from 'styled-components'
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
    <LoginWrapper>
      <Form>
        <LoginAndPassword>
          {/* <label>이메일 : </label> */}
          <LoginInput
            type="email"
            value={email}
            name="email"
            onChange={onChange}
            required
            placeholder="이메일을 입력해주세요"
          ></LoginInput>
        </LoginAndPassword>
        <LoginAndPassword>
          {/* <label>비밀번호 : </label> */}
          <LoginInput
            type="password"
            value={password}
            name="password"
            onChange={onChange}
            required
            placeholder="비밀번호를 입력해주세요"
          ></LoginInput>
        </LoginAndPassword>
        <SignInButton onClick={signIn}>로그인</SignInButton>
        <SignUpButton onClick={signUp}>회원가입</SignUpButton>
      </Form>
    </LoginWrapper>
  )
}

export default Login

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const LoginAndPassword = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;

  & input {
    font-size: medium;
    font-weight: 500;
    padding: 0.6rem 1rem;
  }
`
const LoginInput = styled.input`
  background-color: #ffe7cf;
  width: 100%;
  outline: none;
  border: none;
  border-radius: 0.5rem;
`

const SignInButton = styled.div`
  background-color: var(--mainOrange);
  border: 2px solid var(--mainOrange);
  padding: 0.3rem 1rem;
  margin-right: 0.5rem;
  border-radius: 1rem;
  text-align: center;
  font-size: medium;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-top: 1rem;

  &:hover {
    background-color: transparent;
  }
`
const SignUpButton = styled.div`
  background-color: transparent;
  border: 2px solid var(--mainOrange);
  padding: 0.3rem 1rem;
  margin-right: 0.5rem;
  border-radius: 1rem;
  text-align: center;
  font-size: medium;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-top: 0.5rem;
  &:hover {
    background-color: var(--mainOrange);
    color: #fff;
  }
`

const Form = styled.form``
