import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'

function TopicPostList() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'))
      const fetchedPosts = []
      querySnapshot.forEach((doc) => {
        fetchedPosts.push({ id: doc.id, data: doc.data() })
      })
      setPosts(fetchedPosts)
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.data.title}</h3>
            <p>{post.data.content}</p>
            <p>{post.data.topicName}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TopicPostList
