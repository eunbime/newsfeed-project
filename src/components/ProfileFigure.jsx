import { useState } from 'react'
import styled from 'styled-components'
import Fileupload from './Fileupload'

function ProfileFigure({ userImg }) {
  const [isEdit, setIsEdit] = useState(false)
  return (
    <>
      <FigureBox>
        <img src={userImg} />
        <button onClick={() => setIsEdit(!isEdit)}>프로필 사진 변경</button>
        {isEdit ? <Fileupload onClose={() => setIsEdit(false)} /> : <></>}
      </FigureBox>
    </>
  )
}

export default ProfileFigure

const FigureBox = styled.figure`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 200px;
  padding: 20px;
  & img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    margin: 10px;
  }
  & button {
    margin-top: 10px;
    background-color: var(--mainOrange);
    border: 2px solid var(--mainOrange);
    padding: 0.3rem 1rem;
    border-radius: 1rem;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      background-color: transparent;
    }
  }
  & input {
    background-color: #ffe7cf;
  }
  input[type='file']::file-selector-button {
    background-color: transparent;
  }
  & p {
    margin-top: 10px;
  }
`
