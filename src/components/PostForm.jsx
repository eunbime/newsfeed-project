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
      <form onSubmit={handleCombinedSubmit}>
        <div>
          <label htmlFor="title">제목:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">내용:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <input type="file" onChange={handleFileSelect} />
        <div>
          <label htmlFor="topic">토픽 선택:</label>
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
        </div>
        <Link to="/" onClick={handleCombinedSubmit}>
          제출 및 이미지 업로드
        </Link>
        <Link to="/">Home</Link>
      </form>
    </div>
  )
}

export default PostForm
