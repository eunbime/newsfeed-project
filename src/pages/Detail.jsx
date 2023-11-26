import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import styled from 'styled-components'

import { db } from '../firebase'

function Detail({ posts }) {
  const { id } = useParams()
  console.log(id)
  const [editingContent, setEditingContent] = useState(false)
  const [editingTitle, setEditingTitle] = useState(false)
  const [editedContent, setEditedContent] = useState('')
  const [editedTitle, setEditedTitle] = useState('')
  const [isUserMatch, setIsUserMatch] = useState(false) // 새로운 상태 추가
  const navigate = useNavigate()
  const location = useLocation()
  const post = location.state

  const loginUserUid = useSelector((state) => state.auth.loginUserUid)
  console.log(loginUserUid)

  useEffect(() => {
    // 로그인한 사용자와 게시물의 사용자 ID를 비교하여 일치하는지 확인합니다.
    setIsUserMatch(loginUserUid === post.userid)
  }, [loginUserUid, post.userid])

  const handleDelete = async () => {
    const confirmDelete = window.confirm('정말 이 게시물을 삭제하시겠습니까?')
    if (!confirmDelete) {
      return
    }
    try {
      const postRef = doc(db, 'posts', id)
      await deleteDoc(postRef)
    } catch (error) {
      console.error('게시물 삭제 중 오류:', error)
    }
  }

  const handleEdit = async () => {
    setEditingContent(true)
    setEditedContent(post.content)
    setEditingTitle(true)
    setEditedTitle(post.title)
  }

  const handleSave = async () => {
    if (editedContent.trim() === '' || editedTitle.trim() === '') {
      alert('내용과 제목을 입력해주세요.')
      return
    }
    if (editedContent === post.content && editedTitle === post.title) {
      alert('변경된 내용이 없습니다.')
      return
    }
    const confirmSave = window.confirm(
      '정말 이대로 변경 사항을 저장하시겠습니까?'
    )
    if (!confirmSave) {
      return
    }

    try {
      const postRef = doc(db, 'posts', post.id)
      await updateDoc(postRef, { content: editedContent, title: editedTitle })
      setEditingContent(false)
      setEditingTitle(false)
      const updatedPost = {
        ...post,
        content: editedContent,
        title: editedTitle,
      }
      navigate('/')
    } catch (error) {
      console.error('게시물 업데이트 중 오류:', error)
      // 에러 처리, 예를 들어 에러 메시지 표시 등
    }
  }

  const handleCancelEdit = () => {
    setEditingContent(false)
    setEditingTitle(false)
    setEditedContent(post.content)
    setEditedTitle(post.title)
  }

  return (
    <DetailContainer>
      <TitleContainer>
        <TitleImage src={post.userimg} alt="프로필" />
        {editingTitle ? (
          <StyledInput
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <Titlefontcontainer>
            <h2>{post.title}</h2>
          </Titlefontcontainer>
        )}
      </TitleContainer>
      <UserInfoContainer>
        <p>닉네임 : {post.username}</p>
        <p>선택한 토픽 : {post.topicName}</p>
      </UserInfoContainer>
      <ContentContainer>
        {editingContent ? (
          <StyledTextarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <>
            <PostImage src={post.postImg} alt="게시물" />
            <ContentFontContainer>
              <p>{post.content}</p>
            </ContentFontContainer>
          </>
        )}
      </ContentContainer>
      <ButtonContainer>
        {isUserMatch &&
          (editingContent || editingTitle ? (
            <SaveCancelButtonContainer>
              <Link to="/">
                <button className="save" onClick={handleSave}>
                  저장
                </button>
              </Link>
              <button className="cancel" onClick={handleCancelEdit}>
                취소
              </button>
            </SaveCancelButtonContainer>
          ) : (
            <button className="edit" onClick={handleEdit}>
              수정
            </button>
          ))}
        {isUserMatch && (
          <Link to="/">
            <button className="delete" onClick={handleDelete}>
              삭제
            </button>
          </Link>
        )}
      </ButtonContainer>
    </DetailContainer>
  )
}

export default Detail

const StyledInput = styled.input`
  font-size: 20px;
  width: auto;
  height: 50px;
`
const StyledTextarea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 8px;
  font-size: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical; /* Allow vertical resizing */
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: #fc913a; /* Change border color on focus */
  }
`

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TitleContainer = styled.div`
  box-sizing: border-box;
  font-weight: bold;
  width: auto;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 30px;
  margin-top: 30px;
  text-align: center;
`
const TitleImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`

const Titlefontcontainer = styled.div`
  font-size: 50px;
  margin: auto;
  margin-left: 10px;
`

const UserInfoContainer = styled.div`
  box-sizing: border-box;
  width: auto;
  min-height: 50px;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 25px;
  font-size: 20px;
`
const ContentFontContainer = styled.div`
  font-size: 30px;
  width: 100%;
  line-height: 40px;
`

const ContentContainer = styled.div`
  box-sizing: border-box;
  width: 550px;
  min-height: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-bottom: 10px;
`

const SaveCancelButtonContainer = styled.div`
  display: flex;
  gap: 10px;

  button {
    padding: 10px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    transition:
      background-color 0.3s,
      border-color 0.3s;
    color: #fff;
  }

  button.save,
  button.cancel,
  button.edit,
  button.delete {
    border: 2px solid transparent;
  }

  button.save,
  button.cancel {
    background-color: #fc913a;
  }

  button.cancel {
    background-color: #bd2130;
  }

  button:hover {
    border-color: #fff;
  }
`

const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;

  button {
    padding: 10px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    transition:
      background-color 0.3s,
      border-color 0.3s;
    color: #fff;
  }

  button.edit,
  button.delete {
    background-color: #fc913a;
  }

  button:hover {
    border-color: #fff;
  }
`
