import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'

function TopicPostList({ selectedTopic }) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'))
        const fetchedPosts = []
        querySnapshot.forEach((doc) => {
          fetchedPosts.push({ id: doc.id, data: doc.data() })
        })

        const filteredPosts = fetchedPosts.filter(
          (post) => post.data.topicName === selectedTopic.topicName
        )

        setPosts(filteredPosts)
      } catch (error) {
        console.error('Error fetching data: ', error)
      }
    }

    fetchData()
  }, [selectedTopic, db])

  return (
    <div>
      <h1>Post 리스트</h1>
      <ul>
        {posts.map((post) => {
          console.log('포스트 이미지 확인', post.data.postImg)
          return (
            <li key={post.id}>
              <h3>{post.data.title}</h3>
              <p>{post.data.content}</p>
              <img src={post.data.postImg} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TopicPostList
