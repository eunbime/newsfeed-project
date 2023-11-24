import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { db, storage } from '../firebase'

function CombinedComponent() {
  const [selectedFile, setSelectedFile] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const uploadImageAndGetURL = async () => {
    if (selectedFile) {
      const storageRef = ref(storage, 'folder/' + selectedFile.name)
      await uploadBytes(storageRef, selectedFile)
      console.log('File uploaded successfully!')
      const url = await getDownloadURL(storageRef)
      setImageUrl(url)
      console.log('Image URL:', url)
      return url
    } else {
      console.error('No file selected!')
      return ''
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
      const imageUrl = await uploadImageAndGetURL()
      await addDoc(collection(db, 'detailpost'), {
        title: title,
        content: content,
        imageUrl: imageUrl,
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
