import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

function formatDate(timestamp) {
  if (!timestamp) {
    return 'Not Found'
  }

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
      <PostList>
        {filteredPosts.map((post) => (
          <PostListInfo>
            <PostItem
              key={post.id}
              onClick={() => navigate(`/detail/${post.id}`, { state: post })}
            >
              <UserInfo>
                <UserImage src={post.userimg} alt="Not Found" />
                <UserName>{post.username}</UserName>
              </UserInfo>
              <PostImage src={post.postImg} alt="Not Found" />
              <PostTitle>{post.title}</PostTitle>
              <PostContent>{post.content}</PostContent>
              <PostDate>{formatDate(post.createdAt)}</PostDate>
            </PostItem>
          </PostListInfo>
        ))}
      </PostList>
    </Container>
  )
}

export default TopicPostList

const Container = styled.div`
  width: 100%;
`
const PostList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  justify-content: center;
  list-style-type: none;
  padding: 0;
  gap: 1rem;
`

const PostListInfo = styled.div`
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid #eee;
  cursor: pointer;
  margin: 10px;
  transition:
    transform 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.3);
  }
`

const PostItem = styled.li`
  margin-bottom: 20px;
  max-width: 1250px;
`

const UserInfo = styled.div`
  display: flex;
`

const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 10px;
`

const UserName = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 27px 10px;
`

const PostTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  margin: 5px;
`

const PostImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  margin-bottom: 10px;
`

const PostContent = styled.p`
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 15px;
  margin: 5px;
`

const PostDate = styled.p`
  text-align: right;
  color: #999;
  font-size: 14px;
  margin-right: 5px;
`
