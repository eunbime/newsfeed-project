import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { db, storage } from '../firebase'

function CombinedComponent() {
  const [selectedFile, setSelectedFile] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleUpload = async () => {
    if (selectedFile) {
      const storageRef = ref(storage, 'folder/' + selectedFile.name)
      await uploadBytes(storageRef, selectedFile)
      console.log('File uploaded successfully!')
      // 추가 작업 수행 가능
    } else {
      console.error('No file selected!')
    }
  }

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'detailpost'))
      querySnapshot.forEach((doc) => {
        console.log(doc.id, doc.data())
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    try {
      await addDoc(collection(db, 'detailpost'), {
        title: title,
        content: content,
        createdAt: serverTimestamp(),
      })

      fetchData()

      setTitle('')
      setContent('')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleCombinedSubmit = async (e) => {
    e.preventDefault()
    await handleUpload()
    await handleFormSubmit(e)
  }

  return (
    <div>
      <form onSubmit={handleCombinedSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <input type="file" onChange={handleFileSelect} />
        <button type="submit">Submit and Upload Image</button>
      </form>
    </div>
  )
}

export default CombinedComponent
