import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setIsLogin } from 'redux/config/modules/auth'
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
    dispatch(setIsLogin(false))
  } // TODO: 이 놈의 위치가 애매함

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('login user 있니?', user)
        dispatch(setIsLogin(true))
      }
    })
  }, [])

  return (
    <Container>
      <SearchBox>
        <input type="text" placeholder="검색어를 입력해주세요" />
        <button>검색</button>
      </SearchBox>

      {!isLogin && <button onClick={() => setModalOpen(true)}>로그인</button>}
      {
        //TODO : 아이콘 누르면 드랍박스 나오게 변경해도 됨
        isLogin && (
          <>
            <button onClick={() => navigate('/write')}>글작성</button>
            <button onClick={() => navigate('/mypage')}>mypage</button>
            <button onClick={logOut}>로그아웃</button>
          </>
        )
      }
      {modalOpen && <Modal onClose={() => setModalOpen(false)} />}
    </Container>
  )
}

const SearchBox = styled.div``

const Container = styled.nav`
  display: flex;
  gap: 0.5rem;
`

export default HeaderNav
