import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogin, setLogout } from 'redux/modules/auth'
import styled from 'styled-components'
import { auth } from '../firebase'
import Modal from './Modal'

const HeaderNav = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const isLogin = useSelector((state) => state.auth.isLogin)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logOut = async () => {
    await signOut(auth)
    dispatch(setLogout())
  } // TODO: 이 놈의 위치가 애매함

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('header: login user 있니?', user)
        dispatch(setLogin(user.uid))
      }
    })
  }, [isLogin])

  return (
    <Container>
      {!isLogin && <button onClick={() => setModalOpen(true)}>로그인</button>}
      {isLogin && (
        <>
          <button onClick={() => navigate('/write')}>글작성</button>
          <button onClick={logOut}>로그아웃</button>
          {/* 유저 프로필 사진으로 변경 */}
          <button onClick={() => navigate('/mypage')}>mypage</button>
        </>
      )}
      {modalOpen && <Modal onClose={() => setModalOpen(false)} />}
    </Container>
  )
}

const Container = styled.nav`
  display: flex;
  gap: 0.5rem;
`

export default HeaderNav
