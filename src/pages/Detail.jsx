import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
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
    const confirmDelete = window.confirm('이 게시물을 삭제하시겠습니까?')
    if (!confirmDelete) {
      return
    }
    try {
      const postRef = doc(db, 'posts', post.id)
      await deleteDoc(postRef)
      // 삭제 후 리다이렉트 또는 다른 작업 처리 예시:
      // navigate('/posts') // 게시물 목록 페이지로 리다이렉트
    } catch (error) {
      console.error('게시물 삭제 중 오류:', error)
      // 오류 처리 방법에 따라 처리 (예: 오류 메시지 표시)
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
    const confirmSave = window.confirm('변경 사항을 저장하시겠습니까?')
    if (!confirmSave) {
      return
    }
    const postRef = doc(db, 'posts', post.id)
    await updateDoc(postRef, { content: editedContent, title: editedTitle })
    setEditingContent(false)
    setEditingTitle(false)
    const updatedPost = { ...post, content: editedContent, title: editedTitle }
  }

  const handleCancelEdit = () => {
    setEditingContent(false)
    setEditingTitle(false)
    setEditedContent(post.content)
    setEditedTitle(post.title)
  }

  return (
    <div>
      <img src={post.profileImg} alt="프로필" />
      <p>{post.userid}</p>
      <p>{post.userName}</p>
      {editingTitle ? (
        <input
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
      ) : (
        <h2>{post.title}</h2>
      )}
      <img src={post.postImg} alt="게시물" />
      {editingContent ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      ) : (
        <p>{post.content}</p>
      )}
      {isUserMatch && // 수정, 삭제 버튼은 사용자가 일치하는 경우에만 보여집니다.
        (editingContent || editingTitle ? (
          <div>
            <button onClick={handleSave}>저장</button>
            <button onClick={handleCancelEdit}>취소</button>
          </div>
        ) : (
          <button onClick={handleEdit}>수정</button>
        ))}
      {isUserMatch && ( // 삭제 버튼은 사용자가 일치하는 경우에만 보여집니다.
        <button onClick={handleDelete}>삭제</button>
      )}
    </div>
  )
}

export default Detail
