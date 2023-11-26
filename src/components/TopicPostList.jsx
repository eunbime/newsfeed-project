import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
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
    <Container>
      <Title>실시간 리스트</Title>
      <PostList>
        {posts.map((post) => (
          <PostListInfo>
            <PostItem key={post.id}>
              <StyledLink
                to={{ pathname: `/detail/${post.id}`, state: post.data }}
              >
                <PostTitle>{post.data.title}</PostTitle>
                <PostImage src={post.data.postImg} alt={post.data.title} />
                <PostContent>{post.data.content}</PostContent>
                {/* <PostDate>{formatDate(post.data.createdAt)}</PostDate> */}
              </StyledLink>
            </PostItem>
          </PostListInfo>
        ))}
      </PostList>
    </Container>
  )
}

export default TopicPostList

const Container = styled.div`
  display: flex;
  border: 1px solid black;
  padding: 20px;
`

const PostListInfo = styled.div`
  border: 1px solid black;
  margin: 10px;
`

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 15px;
`

const PostList = styled.ul`
  list-style-type: none;
  padding: 0;
`

const PostItem = styled.li`
  margin-bottom: 20px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  display: block;
`

const PostTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`

const PostImage = styled.img`
  width: 400px;
  height: 300px;
  object-fit: cover;
  margin-bottom: 10px;
`

const PostContent = styled.p`
  color: #666;
`

const PostDate = styled.p`
  color: #999;
  font-size: 14px;
`
