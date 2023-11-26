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
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
`

const NoPosts = styled.div`
  border: 1px solid;
`

const PostList = styled.div`
  padding: 10px;
  border: 1px solid;
`

const ImgBox = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
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

  &:hover {
    transform: scale(1.1);
  }
`
const PostTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`

const PostContent = styled.p`
  font-size: 16px;
  color: #333;
`

export default UserPostList
