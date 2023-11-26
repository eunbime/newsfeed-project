import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../firebase'

function formatDate(timestamp) {
  const date = timestamp.toDate()
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return date.toLocaleDateString('ko-KR', options)
}

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
  }, [selectedTopic])

  return (
    <div>
      <h1>Post 리스트</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={{ pathname: `/detail/${post.id}`, state: post.data }}>
              <h3>{post.data.title}</h3>
              <img src={post.data.postImg} alt={post.data.title} />
              <p>{post.data.content}</p>
              {/* <p>{formatDate(post.data.createdAt)}</p> */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// 더미 데이터 삭제하면 주석 제거하기
export default TopicPostList
