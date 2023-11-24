import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsLogin } from 'redux/config/modules/auth';
import styled from 'styled-components';
import { auth } from '../firebase';
import Modal from './Modal';
import Search from './Search';

const HeaderNav = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const isLogin = useSelector(state => state.auth.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = async () => {
    await signOut(auth);
    dispatch(setIsLogin(false));
  };
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log("login user 있니?", user); 
  //       dispatch(setIsLogin(true));
  //     }
  //   })
  // }, []);

  return (
    <Container>
      <Search />
      {
        !isLogin &&
        <button onClick={() => setModalOpen(true)}>
          로그인
        </button>
      }

      { //TODO : 아이콘 누르면 드랍박스 나오게 변경해도 됨
        isLogin &&
        <>
          <button onClick={() => navigate('/write')}>
            글작성
          </button>
          <button onClick={() => navigate('/mypage')}>
            mypage
          </button>
          <button onClick={logOut}>
            로그아웃
          </button>
        </>

      }
      {
        modalOpen &&
        <Modal onClose={() => setModalOpen(false)} />
      }
    </Container>
  )
}

const Container = styled.nav`
  display: flex;
  gap: 0.5rem;
`

export default HeaderNav
