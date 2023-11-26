import PostCarousel from 'components/PostCarousel'
import TabNavigation from 'components/TabNavigation'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setTopic } from 'redux/modules/topics'
import styled from 'styled-components'
import { db } from '../firebase'

function Home() {
  const dispatch = useDispatch()
  const topics = useSelector((state) => state.topics)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const fetchTopic = async () => {
      const querySnapshot = await getDocs(collection(db, 'topics'))
      const initialTopics = []

      querySnapshot.forEach((doc) => {
        initialTopics.push({ id: doc.id, ...doc.data() })
      })
      dispatch(setTopic(initialTopics))
    }
    fetchTopic()
    setIsLoading(false)
  }, [])

  if (isLoading) return <div>...loading</div>

  return (
    <>
      <TabNavigation />
      <Container>
        <ListContainer>
          {topics.length > 0 ? (
            topics.map((topic) => (
              <div key={topic.id}>
                <Link to={`/topic/${topic.topicName}`} state={{ topic: topic }}>
                  <TopicTitle>{topic.topicName}</TopicTitle>
                </Link>
                <PostCarousel topic={topic} />
              </div>
            ))
          ) : (
            <NotFoundPost>
              <h2>현재 게시된 포스트가 없습니다.</h2>
            </NotFoundPost>
          )}
        </ListContainer>
      </Container>
    </>
  )
}

export default Home

const Container = styled.div`
  width: 100%;
  padding: 1rem;
`

const ListContainer = styled.div`
  max-width: 1250px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
`

const TopicTitle = styled.h2`
  padding: 1rem 0;
  font-size: large;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #888;
  }

  @media (min-width: 750px) {
    font-size: x-large;
  }
`

const NotFoundPost = styled.div`
  //
`
