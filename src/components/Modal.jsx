import styled from "styled-components";
import Login from "./Login";

const Modal = ({ onClose }) => {

  return (
    <>
      <ModalWrapper>
        <ModalBox>
          <ModalOffBtn onClick={onClose}> X </ModalOffBtn>
          <Login onModalClose={onClose} />
        </ModalBox>
      </ModalWrapper>
    </>);
}

export default Modal

const ModalWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position :fixed;
    top : 0;
    left : 0;
    width:100%;
    height: 100%;
    background-color: rgb(0,0,0,0.5);
    z-index: 99;
`
const ModalBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 500px;
    background-color: white;
    padding: 20px;
    border: 2px solid rgb(240, 240, 240);
    border-radius: 12px;
    transition: 1s;
`;

const ModalOffBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e3e1e1;
  font-size: 1.4rem;
  cursor: pointer;
  
  margin-left:auto;

`