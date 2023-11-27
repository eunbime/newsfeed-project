import styled from 'styled-components'
import Login from './Login'
import SocialLogin from './SocialLogin'

const Modal = ({ onClose }) => {
  return (
    <>
      <ModalWrapper>
        <ModalBox>
          <ModalDiv>
            <h1>로그인</h1>
            <ModalOffdiv onClick={onClose}>X</ModalOffdiv>
          </ModalDiv>
          <Login onModalClose={onClose} />
          <SocialLogin />
        </ModalBox>
      </ModalWrapper>
    </>
  )
}

export default Modal

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  z-index: 99;
`
const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 300px;
  background-color: white;
  padding: 25px 40px;
  border: 2px solid rgb(240, 240, 240);
  border-radius: 12px;
  transition: 1s;
`

const ModalOffdiv = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  font-weight: 500;
  color: #a15208;
`

const ModalDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  justify-content: space-between;

  & h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #a15208;
  }
`
