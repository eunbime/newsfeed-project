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
import { db, storage } from '../firebase'
import styled from 'styled-components'

function PostForm() {
  const topics = useSelector((state) => state.topics)
  const [selectedTopic, setSelectedTopic] = useState('')
  const [selectedFile, setSelectedFile] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
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
      await uploadBytes(storageRef, selectedFile)
      const url = await getDownloadURL(storageRef)
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
    <div>
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
            <input type="file" onChange={handleFileSelect} />
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
                제출 및 이미지 업로드
              </Link>
            </SubmitButton>
            <HomeButton>
              <Link to="/">Home</Link>
            </HomeButton>
          </ButtonWrapper>
        </form>
      </Form>
    </div>
  )
}

export default PostForm

const Form = styled.form`
  background-color: #d9d9d9;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 500px;
  height: 500px;
  border-radius: 12px;
  margin: 60px auto;
  text-align: center;
`
const InputWrapper = styled.div`
  & textarea {
    width: 420px;
    height: 40vh;

    text-align: start;
  }
  & input {
    height: 30px;
    width: 420px;
    margin: 15px 0;
    text-align: start;
  }
`
const FileWrapper = styled.div`
  margin-left: 3.5vh;
  margin-top: 1vh;
  text-align: start;
`
const TopicWrapper = styled.div`
  margin-left: 3.5vh;
  margin-top: 1vh;
  text-align: start;
`
const ButtonWrapper = styled.div`
  display: flex;
  text-align: end;
  margin: 10px;
`
const SubmitButton = styled.button`
  margin-left: 2.2vh;
`
const HomeButton = styled.button`
  margin-left: 30.5vh;
`
