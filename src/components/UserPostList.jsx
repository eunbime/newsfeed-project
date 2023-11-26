import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

const UserPostList = ({ userPosts }) => {
  const location = useLocation()
  const [topic, setTopic] = useState('')
  const selectedTopic = location.state?.topic

  useEffect(() => {
    setTopic(selectedTopic)
  }, [selectedTopic])

  if (topic === '') return <div>현재 게시물이 없습니다.</div>

  return (
    <Container>
      {userPosts
        .filter((post) => {
          return post.topicName === topic
        })
        .map((post) => (
          <PostList>
            <ImgBox image={post.postImg} />
            <li>{post.title}</li>
            <li>{post.content}</li>
          </PostList>
        ))}
    </Container>
  )
}

const Container = styled.div`
  //
`

const PostList = styled.ul`
  //
`

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 750px;
  height: 400px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
`

export default UserPostList
