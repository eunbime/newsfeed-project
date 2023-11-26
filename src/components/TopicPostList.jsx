import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

function formatDate(timestamp) {
  const date = timestamp.toDate()
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return date.toLocaleDateString('ko-KR', options)
}

function TopicPostList({ selectedTopic }) {
  const navigate = useNavigate()
  const posts = useSelector((state) => state.posts)

  const filteredPosts = posts.filter((post) => post.topicName === selectedTopic)

  return (
    <Container>
      <Title>Posts</Title>
      <PostList>
        {filteredPosts.map((post) => (
          <PostListInfo>
            <PostItem
              key={post.id}
              onClick={() => navigate(`/detail/${post.id}`, { state: post })}
            >
              <PostTitle>{post.title}</PostTitle>
              <PostImage src={post.postImg} alt="Not Found" />
              <PostContent>{post.content}</PostContent>
              {/* <PostDate>{formatDate(post.data.createdAt)}</PostDate> */}
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
