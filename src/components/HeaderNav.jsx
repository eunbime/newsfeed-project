import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogin, setLogout } from 'redux/modules/auth'
import { logOutUser } from 'redux/modules/user'
import styled from 'styled-components'
import { auth } from '../firebase'
import Modal from './Modal'

const profileImg = 'default-profile.jpeg'

const HeaderNav = () => {
  const localuid = localStorage.getItem('useruid')
  const [modalOpen, setModalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const user = useSelector((state) => state.user)
  const isLogin = useSelector((state) => state.auth.isLogin)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('naviheader: user', user)
        dispatch(setLogin(user.uid))
      }
    })
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [isLogin])

  const logOut = async () => {
    await signOut(auth)
    dispatch(setLogout())
    dispatch(logOutUser())
    localStorage.removeItem('useruid')
    navigate(`/`)
  }

  const handleToPage = (page) => {
    setMenuOpen(false)
    navigate(`/${page}`)
  }

  const handleBlurContainer = () => {
    setTimeout(() => {
      setMenuOpen(false)
    }, 200)
    console.log('blur!')
  }

  return (
    <Container>
      {!isLogin && (
        <NavButton onClick={() => setModalOpen(true)}>로그인</NavButton>
      )}
      {isLogin && (
        <>
          <NavButton onClick={() => handleToPage('write')}>
            글 작성하기
          </NavButton>
          {/* 유저 프로필 사진으로 변경 */}
          <ProfileBoxWrapper>
            <ProfileBox onMouseDown={() => setMenuOpen(!menuOpen)}>
              <img src={user.userimg || profileImg} alt="" />
            </ProfileBox>
            {menuOpen && (
              <ProfileMenu onMouseLeave={handleBlurContainer}>
                <div onClick={() => handleToPage('mypage')}>My Page</div>
                <div onClick={logOut}>로그아웃</div>
              </ProfileMenu>
            )}
          </ProfileBoxWrapper>
        </>
      )}
      {modalOpen && <Modal onClose={() => setModalOpen(false)} />}
    </Container>
  )
}

const Container = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const NavButton = styled.button`
  background-color: #fff;
  border: 2px solid var(--mainOrange);
  padding: 0.3rem 1rem;
  margin-right: 1rem;
  border-radius: 1rem;
  text-align: center;
  font-size: large;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: var(--mainOrange);
    color: #fff;
  }
`

const ProfileBoxWrapper = styled.div`
  position: relative;
  transition: all 0.5s;
`

const ProfileBox = styled.div`
  width: 60px;
  height: 60px;
  background-color: gray;
  border-radius: 50%;
  overflow: hidden;

  > img {
    width: inherit;
    height: inherit;
  }
`

const ProfileMenu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  color: #444;
  background-color: #fff;
  width: 11rem;
  margin-top: 1.2rem;
  right: 0;
  box-shadow: 0 0 5px #888;
  border-radius: 0.5rem;
  padding: 0 0.5rem;

  div {
    cursor: pointer;
    border: none;
    text-align: start;
    font-weight: 500;
    padding: 1rem 1rem;
    border-bottom: 0.5px solid #999;
    transition: 0.3s;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      color: #888;
    }
  }
`

export default HeaderNav
