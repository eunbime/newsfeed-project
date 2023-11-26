import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
          const linkState = { postData: post.data }
          console.log('Link state:', linkState)
          return (
            <Link to={`/detail/${post.id}`} state={post.data}>
              <li key={post.id}>
                <h3>{post.data.title}</h3>
                <img src={post.data.postImg} />
                <p>{post.data.content}</p>
              </li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}
export default TopicPostList
