import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { db, storage } from '../firebase'

function PostForm() {
  const topics = useSelector((state) => state.topics)
  const [selectedTopic, setSelectedTopic] = useState('')
  const [selectedFile, setSelectedFile] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { auth, user } = useSelector((state) => state)
  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif']
  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (allowedFileTypes.includes(file.type)) {
        setSelectedFile(file)
      } else {
        alert(
          '이 파일 형식은 허용되지 않습니다. JPG, PNG, GIF 파일을 선택해주세요.'
        )
        event.target.value = null
        setSelectedFile('')
      }
    }
  }
  const uploadImageAndGetURL = async () => {
    if (selectedFile) {
      const storageRef = ref(storage, 'folder/' + selectedFile.name)
      await uploadBytes(storageRef, selectedFile) // 파일 업로드
      const url = await getDownloadURL(storageRef) // 파일 url 가져오기
      setImageUrl(url)
      return url
    } else {
      return ''
    }
  }
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'posts'))
      querySnapshot.forEach((doc) => {
        console.log(doc.id, doc.data())
      })
    } catch (error) {
      console.error('오류:', error)
    }
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (!title || !content || !selectedTopic) {
      alert('제목, 내용, 토픽을 모두 입력해주세요.')
      return
    }
    const userConfirmation = window.confirm(
      '선택한 파일과 토픽으로 제출하시겠습니까?'
    )
    if (userConfirmation) {
      try {
        let imageUrl = ''
        if (selectedFile) {
          imageUrl = await uploadImageAndGetURL()
        }
        await addDoc(collection(db, 'posts'), {
          title: title,
          content: content,
          postImg: imageUrl,
          topicName: selectedTopic,
          userid: auth.loginUserUid,
          username: user.nickname,
          userimg: user.userimg,
          createdAt: serverTimestamp(),
        })
        fetchData()
        setTitle('')
        setContent('')
        setSelectedTopic('')
        setSelectedFile('')
        alert('양식이 성공적으로 제출되었습니다!')
        window.location.href = '/'
      } catch (error) {
        console.error('오류:', error)
        alert('양식 제출 중 오류가 발생했습니다')
      }
    } else {
      alert('제출이 취소되었습니다')
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  const handleCombinedSubmit = async (e) => {
    e.preventDefault()
    await handleFormSubmit(e)
  }

  return (
    <PostFormContainer>
      <HeadTitle>Enjoy P</HeadTitle>
      <Form>
        <form onSubmit={handleCombinedSubmit}>
          <InputWrapper>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요(20자 제한)"
              maxLength={20}
            />
          </InputWrapper>
          <InputWrapper>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력해주세요(200자 제한)"
              maxLength={200}
            ></textarea>
          </InputWrapper>
          <FileWrapper>
            <label htmlFor="file-upload" className="custom-file-upload">
              파일 첨부
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </FileWrapper>
          <TopicWrapper>
            <select
              id="topic"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
            >
              <option value="">토픽 선택...</option>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.topicName}>
                  {topic.topicName}
                </option>
              ))}
            </select>
          </TopicWrapper>
          <ButtonWrapper>
            <SubmitButton>
              <Link to="/" onClick={handleCombinedSubmit}>
                등록하기
              </Link>
            </SubmitButton>
            <HomeButton>
              <Link to="/">Home</Link>
            </HomeButton>
          </ButtonWrapper>
        </form>
      </Form>
    </PostFormContainer>
  )
}
export default PostForm
const PostFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const HeadTitle = styled.div`
  font-size: xx-large;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-align: center;
  display: flex;
  position: fixed;
  margin-top: 60px;
`
const Form = styled.form`
  background-color: #f3f3f3;
  padding: 1.5vh;
  display: flex;
  flex-direction: column;
  gap: 1.2vh;
  width: 40vw;
  height: 68vh;
  border-radius: 3vh;
  position: fixed;
  top: 50%;
  left: 50%;
  margin: auto;
  transform: translate(-50%, -50%);
  text-align: center;
  @media screen and (max-width: 600px) {
    /* 화면 너비가 600px 이하일 때 적용되는 스타일 */
    width: 90vw;
    height: 80vh;
  }
`
const InputWrapper = styled.div`
  & textarea {
    width: 92%;
    height: 40vh;
    margin-top: 2vh;
    text-align: start;
    box-sizing: border-box;
    resize: none;
    border-radius: 5px;
    border-width: 0;
  }
  & input {
    height: 4vh;
    width: 92%;
    margin-top: 2vh;
    text-align: start;
    box-sizing: border-box;
    border-radius: 5px;
    border-width: 0;
  }
`
const FileWrapper = styled.div`
  margin-left: 4vh;
  margin-top: 1vh;
  text-align: start;

  .custom-file-upload {
    border: 1px solid black;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    background-color: #f7f7f7;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  .custom-file-upload:hover {
    background-color: gray;
  }
`
const TopicWrapper = styled.div`
  margin-left: 2vw;
  margin-top: 1vh;
  text-align: start;
  & select {
    width: 9vw;
    height: 4vh;
  }
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1vh;
`
const SubmitButton = styled.button`
  width: 13vw;
  height: 5vh;
  margin-left: 2vw;
  margin-top: 1vh;
  align-self: flex-start;
  @media screen and (max-width: 600px) {
    /* 화면 너비가 600px 이하일 때 적용되는 스타일 */
    width: 13vw; /* 예시: 화면이 작아지면 버튼을 전체 너비로 설정 */
  }
`
const HomeButton = styled.button`
  width: 13vw;
  height: 5vh;
  margin-right: 2vw;
  margin-top: 1vh;
  @media screen and (max-width: 600px) {
    /* 화면 너비가 600px 이하일 때 적용되는 스타일 */
    width: 13vw; /* 예시: 화면이 작아지면 버튼을 전체 너비로 설정 */
  }
`
