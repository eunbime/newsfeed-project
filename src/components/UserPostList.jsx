import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const UserPostList = ({ userPosts }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [topic, setTopic] = useState('')
  const selectedTopic = location.state?.topic

  useEffect(() => {
    setTopic(selectedTopic)
  }, [selectedTopic])

  if (topic === '') return <NoPosts>현재 게시물이 없습니다.</NoPosts>

  return (
    <StDiv>
      <Container>
        {userPosts
          .filter((post) => {
            return post.topicName === topic || selectedTopic === undefined
          })
          .map((post) => {
            return (
              <PostList
                key={post.id}
                onClick={() => navigate(`/detail/${post.id}`, { state: post })}
              >
                <PostInfo>
                  <ImgBox image={post.postImg} />
                  <PostTitle>{post.title}</PostTitle>
                  <PostContent>{post.content}</PostContent>
                </PostInfo>
              </PostList>
            )
          })}
      </Container>
    </StDiv>
  )
}

const StDiv = styled.div`
  width: 100%;
`

const Container = styled.div`
  /* display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px; */
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;
`

const NoPosts = styled.div`
  border: 1px solid;
`

const PostList = styled.div`
  padding: 10px;
  width: 400px;
`

const ImgBox = styled.div`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 5px;
`

const PostInfo = styled.div`
  margin: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: transform 0.3s ease;
  border-radius: 10px;
  background-color: #ffe7cf;
  margin: 10px;
  padding: 10px;
  cursor: pointer;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.1);
  }
`
const PostTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
`

const PostContent = styled.p`
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #333;
`

export default UserPostList
