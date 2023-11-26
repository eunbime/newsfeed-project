import { collection, doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from 'redux/modules/user'
import styled from 'styled-components'
import { db, storage } from '../firebase'

function Fileupload() {
  const localuid = localStorage.getItem('useruid')
  const [selectedFile, setSelectedFile] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif']
  const dispatch = useDispatch()

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   await handleFormSubmit(e)
  // }

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault()

  const saveDB = async (imageUrl) => {
    await setDoc(
      doc(collection(db, 'userInfo'), localuid),
      {
        userimg: imageUrl,
      },
      { merge: true }
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userConfirmation = window.confirm('선택한 파일을 제출하시겠습니까?')

    if (userConfirmation) {
      try {
        let imageUrl = ''
        if (selectedFile) {
          imageUrl = await uploadImageAndGetURL(localuid)
          dispatch(setUser({ userimg: imageUrl }))
          saveDB(imageUrl)
          setSelectedFile('')
        }
        alert('등록 성공!')
      } catch (error) {
        console.error('오류:', error)
        alert('등록 오류!')
      }
    } else {
      alert('등록 취소!')
    }
  }

  const uploadImageAndGetURL = async (folder) => {
    if (selectedFile) {
      const storageRef = ref(storage, folder + '/' + selectedFile.name)
      await uploadBytes(storageRef, selectedFile)
      const url = await getDownloadURL(storageRef)
      setImageUrl(url)
      return url
    } else {
      console.error('No file selected!')
      return ''
    }
  }

  return (
    <FileuploadContainer>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={handleSubmit}>사진제출</button>
    </FileuploadContainer>
  )
}

export default Fileupload

const FileuploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 10px;
  width: 190px;
  & p {
  }
  & input {
    margin: 10px 0;
    width: 190px;
  }
`
