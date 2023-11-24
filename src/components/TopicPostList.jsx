import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { db } from '../firebase'

function TopicPostList({ selectedTopic }) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'))
      const fetchedPosts = []
      querySnapshot.forEach((doc) => {
        fetchedPosts.push({ id: doc.id, data: doc.data() })
      })

      // 선택된 토픽과 일치하는 포스트만 필터링
      const filteredPosts = fetchedPosts.filter(
        (post) => post.data.topicName === selectedTopic.topicName
      )

      setPosts(filteredPosts)
    }

    fetchData()
  }, [selectedTopic])

  return (
    <div>
      <ProfileList>
        {posts.map((post) => (
          <ProfileCard key={post.id}>
            <ProfileInfo>
              <ProfileImage src={post.data.profileImg} alt="Profile" />
              <UserName>{post.data.userName}</UserName>
            </ProfileInfo>
            <PostImage src={post.data.postImg} alt="Post" />
            <PostTitle>{post.data.title}</PostTitle>
            <PostContent>{post.data.content}</PostContent>
            <PostDate>{post.data.createdAt}</PostDate>
          </ProfileCard>
        ))}
      </ProfileList>
    </div>
  )
}

export default TopicPostList

const ProfileList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
  padding: 0;
`

const ProfileCard = styled.li`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  width: 300px;
  background-color: green;
`

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid #ccc;
`

const PostImage = styled.img`
  width: 100%;
  max-width: 100%;
  margin-bottom: 10px;
`

const UserName = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
`

const PostTitle = styled.h3`
  margin-bottom: 5px;
`

const PostContent = styled.p`
  margin-bottom: 10px;
`

const PostDate = styled.p`
  font-size: 12px;
  text-align: right;
`
