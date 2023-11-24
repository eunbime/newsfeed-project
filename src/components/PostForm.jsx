import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'

function PostForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

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

  return (
    <form onSubmit={handleFormSubmit}>
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
      <button type="submit">Submit</button>
    </form>
  )
}

export default PostForm
