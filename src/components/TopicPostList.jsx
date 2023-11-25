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

  console.log(posts[1])

  return (
    <div>
      <h1>Post 리스트</h1>
      <ul>
        {posts.map((post) => {
          // const newDate = post.data.createdAt.toDate()
          return (
            <li key={post.id}>
              <h3>{post.data.title}</h3>
              <p>{post.data.content}</p>
              <img src={post.data.postImg} />
              <li></li>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default TopicPostList
